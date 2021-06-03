import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PostList from '../components/PostList';
import '../scss/Mypage.scss';

const Myapage = ({ isLogin, userinfo, history }) => {
  if (!isLogin) {
    history.push('/main');
  }

  const [isUserPosts, setIsUserPosts] = useState(true);
  const [posts, setPosts] = useState([]);

  let profileImage = userinfo.profileImage;

  useEffect(() => getUserPosts(), []);

  const getUserPosts = () => {
    setIsUserPosts(true);
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
    setIsUserPosts(false);
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
    <div className="mypage">
      <div className="user-info-area">
        <div className="user-info">
          <div className="user-profile-img">
            <img src={profileImage} className="user-img" alt=""></img>
          </div>
          <div className="user-i">
            <div className="nickname">{userinfo.nickname}</div>
            <div className="email">{userinfo.email}</div>
            <button
              className="btn userinfo-modify"
              onClick={() => history.push('/updateUserinfo')}
            >
              회원정보 수정
            </button>
          </div>
        </div>
        <div className="image-list-type">
          <span
            className={isUserPosts ? 'slide-btn selected' : 'slide-btn'}
            onClick={getUserPosts}
          >
            게시글
          </span>
          <span
            className={isUserPosts ? 'slide-btn' : 'slide-btn selected'}
            onClick={getInterestPost}
          >
            관심글
          </span>
        </div>
        <div>
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Myapage);
