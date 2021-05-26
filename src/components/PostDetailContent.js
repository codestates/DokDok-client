import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginModal, setMessageModal, setPost } from '../actions';

const PostDetailContent = ({ post, isLogin, history }) => {
  const dispatch = useDispatch();
  const [interestIconColor, setInterestIconColor] = useState('#cccccc');

  useEffect(() => {
    if (isLogin) {
      getInterestInfo();
    }
  }, []);

  const getInterestInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/interests/${post.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.interest) {
          setInterestIconColor('#d62d20');
        }
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const checkLoginStatus = (callback) => {
    if (isLogin) {
      callback();
    } else {
      dispatch(setLoginModal(true));
    }
    return;
  };

  const interestPost = () => {
    if (interestIconColor === '#cccccc') {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/interests`,
          {
            id: post.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          },
        )
        .then(() => {
          setInterestIconColor('#d62d20');
        })
        .catch((err) => {
          if (err) throw err;
        });
    } else {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/interests`, {
          data: { id: post.id },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        })
        .then(() => {
          setInterestIconColor('#cccccc');
        });
    }
  };

  const deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then(() => {
        dispatch(setMessageModal(true, '게시글을 삭제했습니다.'));
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <React.Fragment>
      <div className="content-header">
        <div className="userinfo">
          <div
            className="profile-image"
            style={{ backgroundImage: `url(${post.User.profile_image})` }}
          />
          <div>
            <div className="nickname">{post.User.nickname}</div>
            <div className="address">{post.address}</div>
          </div>
        </div>
        <div className="icons">
          <i
            className="fas fa-comment-dots fa-lg"
            onClick={() => {
              checkLoginStatus(() => history.push('/chat'));
            }}
          />
          <i
            className="fas fa-heart fa-lg"
            style={{ color: `${interestIconColor}` }}
            onClick={() => checkLoginStatus(interestPost)}
          />
          <i
            className="fas fa-edit fa-lg"
            onClick={() => {
              checkLoginStatus(() => {
                dispatch(setPost(post));
                history.push('/post-edit');
              });
            }}
          />
          <i
            className="fas fa-trash-alt fa-lg"
            onClick={() => checkLoginStatus(deletePost)}
          />
        </div>
      </div>
      <hr />
      <div className="content">
        <div>
          <p className="title">{post.title}</p>
          <p>{post.createdAt}</p>
        </div>
        <div>{post.content}</div>
      </div>
      <div className="map-title">만남 장소</div>
    </React.Fragment>
  );
};

export default withRouter(PostDetailContent);
