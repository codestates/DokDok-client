import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLogin, setLoginModal, setUserinfo } from '../actions/index';
import axios from 'axios';

const UserControl = ({ isLogin, profileImage, getDefaultPosts, history }) => {
  const dispatch = useDispatch();

  async function logout() {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/logout`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then(() => {
        dispatch(setIsLogin(false));
        localStorage.removeItem('accessToken');
        history.push('/main');
      })
      .catch((err) => {
        if (err.response.data === 'Refresh token expired') {
          dispatch(setIsLogin(false));
          dispatch(setUserinfo({}));
          localStorage.removeItem('accessToken');
          history.push('/login');
        }
        if (err) throw err;
      });
  }

  return (
    <ul className="nav-user-control">
      <li className="nav-chatroom" onClick={() => {}}>
        채팅방
      </li>
      <li
        className="nav-post-list"
        onClick={() => {
          getDefaultPosts();
          history.push('/main');
        }}
      >
        게시글 목록
      </li>
      <li className="nav-post-publish" onClick={() => {}}>
        게시글 등록
      </li>
      {isLogin ? (
        <React.Fragment>
          <li className="nav-logout" onClick={logout}>
            로그아웃
          </li>
          <div
            className="nav-mypage"
            style={{ backgroundImage: `url(${profileImage})` }}
            onClick={() => {
              history.push('/mypage');
            }}
          ></div>
        </React.Fragment>
      ) : (
        <li
          className="nav-login"
          onClick={() => {
            dispatch(setLoginModal(true));
          }}
        >
          로그인
        </li>
      )}
    </ul>
  );
};

export default withRouter(UserControl);
