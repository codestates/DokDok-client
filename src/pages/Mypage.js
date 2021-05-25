import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PostList from '../components/PostList';

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
        console.log(res);
        // setPosts(res.data.data);
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
        console.log(res);
        // setPosts(res.data.data);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <div className="Mypage">
      <div className="user-info-area">
        <div className="user-profile-img">
          <img src={profileImage} className="img"></img>
        </div>
        <div className="user-info">
          <p className="nickname">{userinfo.nickname}</p>
          <p>{userinfo.email}</p>
          <button
            className="btn userinfo-modify"
            onClick={() => history.push('/updateUserinfo')}
          >
            회원정보 수정
          </button>
        </div>
        <div className="image-list-type">
          <ul>
            <li onClick={() => getUserPosts}>게시물</li>
            <li onClick={() => getInterestPost}>관심글</li>
          </ul>
        </div>
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default withRouter(Myapage);
