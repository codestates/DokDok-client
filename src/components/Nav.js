import '../scss/Nav.scss';
import React from 'react';
import Search from './Search';
import { withRouter } from 'react-router-dom';

import HamburgerMenu from './HamburgerMenu';
import UserControl from './UserControl';

const Nav = ({ isLogin, profileImage, getDefaultPosts, history }) => {
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
      <UserControl
        isLogin={isLogin}
        profileImage={profileImage}
        getDefaultPosts={getDefaultPosts}
      />
      <HamburgerMenu
        isLogin={isLogin}
        profileImage={profileImage}
        getDefaultPosts={getDefaultPosts}
      />
    </nav>
  );
};

export default withRouter(Nav);
