import '../scss/HamburgerMenu.scss';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import UserControl from './UserControl';

const HamburgerMenu = ({ isLogin, profileImage, getDefaultPosts }) => {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div
      className={isActive ? 'hamburger-menu active' : 'hamburger-menu'}
      onClick={toggleClass}
    >
      <span></span>
      <span></span>
      <span></span>
      <UserControl
        isLogin={isLogin}
        profileImage={profileImage}
        getDefaultPosts={getDefaultPosts}
      />
    </div>
  );
};

export default withRouter(HamburgerMenu);
