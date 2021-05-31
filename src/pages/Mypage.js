import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PostList from '../components/PostList';
import '../scss/Mypage.scss';

const Myapage = ({ isLogin, userinfo, history }) => {
  if (!isLogin) {
    history.push('/main');
  }

  const [posts, setPosts] = useState([]);

  let profileImage = userinfo.profileImage;

  useEffect(() => getUserPosts(), []);

  const getUserPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((res) => {
        setPosts(res.data.result.reverse());
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const getInterestPost = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/interests`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((res) => {
        setPosts(res.data.reverse());
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <div className="Mypage">
      <div className="user-info-area">
        <div className="user-info">
          <div className="user-profile-img">
            <img src={profileImage} className="user-img"></img>
          </div>
          <div className="user-i">
            <div className="nickname">{userinfo.nickname}</div>
            <div>{userinfo.email}</div>
            <div>
              <button
                className="btn-userinfo-modify"
                onClick={() => history.push('/updateUserinfo')}
              >
                회원정보 수정
              </button>
            </div>
          </div>
        </div>
        <div className="image-list-type">
          <div className="slide-btn-1" onClick={getUserPosts}>
            게시물
          </div>
          <div className="slide-btn-2" onClick={getInterestPost}>
            관심글
          </div>
        </div>
        <div>
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Myapage);
