import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import Category from '../components/Category';
import PostList from '../components/PostList';
import { useDispatch } from 'react-redux';
import { setIsLogin, setUserinfo } from '../actions';

const Main = ({ posts, location, history }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    '';
    const parsed = queryString.parse(location.search);
    const accessToken = parsed.access_token;
    if (accessToken) {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          localStorage.setItem('accessToken', accessToken);
          dispatch(setIsLogin(true));
          dispatch(setUserinfo(res.data.user));
        });
      history.push('/main');
    }
  }, [location]);

  return (
    <div className="main">
      <Category />
      <PostList posts={posts} />
    </div>
  );
};

export default withRouter(Main);
