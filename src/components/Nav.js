import '../scss/Nav.scss';
import React from 'react';
import Search from './Search';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../actions/index';
import axios from 'axios';

const Nav = ({ isLogin, profileImage, history }) => {
  const dispatch = useDispatch();

  async function logout() {
    // await axios
    //   .post(`${process.env.REACT_APP_API_URL}/users/logout`, null, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.accessToken}`,
    //     },
    //   })
    //   .then(() => {
    //     dispatch(setIsLogin(false));
    //     localStorage.removeItem('accessToken');
    //     history.push('/main');
    //   })
    //   .catch((err) => {
    //     if (err.response.data === 'Refresh token expired') {
    //       dispatch(setIsLogin(false));
    //       localStorage.removeItem('accessToken');
    //       history.push('/login');
    //     }
    //     if (err) throw err;
    //   });
  }

  return (
    <nav className="nav">
      <div className="nav-logo-and-search">
        <div className="nav-logo" onClick={() => history.push('/')}>
          logo
        </div>
        <div className="nav-search">
          <Search />
        </div>
      </div>
      <ul className="nav-user-control">
        <li className="nav-chatroom" onClick={() => {}}>
          채팅방
        </li>
        <li className="nav-post-list" onClick={() => history.push('/main')}>
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
              onClick={() => {}}
            ></div>
          </React.Fragment>
        ) : (
          <li className="nav-login" onClick={() => {}}>
            로그인
          </li>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Nav);
