import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import Category from '../components/Category';
import PostList from '../components/PostList';

const Main = ({ posts, getDefaultPosts, location, history }) => {
  useEffect(async () => {
    const parsed = queryString.parse(location.search);
    const accessToken = parsed.access_token;
    if (accessToken) {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      console.log(result.data);
      history.push('/main');
    }
  }, [location]);

  useEffect(() => getDefaultPosts(), []);

  return (
    <div className="main">
      <Category />
      <PostList posts={posts} />
    </div>
  );
};

export default withRouter(Main);
