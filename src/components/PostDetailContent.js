import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginModal, setMessageModal } from '../actions';
import { createRoom, getRooms } from '../reducers/chattingReducer';

const PostDetailContent = ({ post, isLogin, userId, history }) => {
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
          data: {
            id: post.id,
          },
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
      .delete(`${process.env.REACT_APP_API_URL}/posts`, {
        data: {
          id: post.id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then(() => {
        history.goBack();
        dispatch(setMessageModal(true, '???????????? ??????????????????.'));
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const convertTime = (date) => {
    const today = new Date();
    const timeValue = new Date(date);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 5) {
      return '?????? ???';
    }
    if (betweenTime < 60) {
      return `${betweenTime}??? ???`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}?????? ???`;
    }
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}??? ???`;
    }
    return `${Math.floor(betweenTimeDay / 365)}??? ???`;
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
          {userId === post.UserId || (
            <i
              className="fas fa-comment-dots fa-lg"
              onClick={() => {
                checkLoginStatus(() => {
                  dispatch(createRoom(post.UserId));
                  setTimeout(() => {
                    dispatch(getRooms());
                    history.push(`/rooms`);
                  }, 500);
                });
              }}
            />
          )}

          <i
            className="fas fa-heart fa-lg"
            style={{ color: `${interestIconColor}` }}
            onClick={() => checkLoginStatus(interestPost)}
          />
          {post.UserId === userId ? (
            <React.Fragment>
              <i
                className="fas fa-edit fa-lg"
                onClick={() => {
                  checkLoginStatus(() => {
                    history.push('/post-edit');
                  });
                }}
              />
              <i
                className="fas fa-trash-alt fa-lg"
                onClick={() => checkLoginStatus(deletePost)}
              />
            </React.Fragment>
          ) : null}
        </div>
      </div>
      <hr />
      <div className="content">
        <div>
          <p className="title">{post.title}</p>
          <p>{convertTime(post.createdAt)}</p>
        </div>
        <div>{post.content}</div>
      </div>
      <div className="map-title">?????? ??????</div>
    </React.Fragment>
  );
};

export default withRouter(PostDetailContent);
