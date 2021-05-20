import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Category from '../components/Category';
import PostList from '../components/PostList';

const Main = ({ posts, getDefaultPosts }) => {
  useEffect(() => getDefaultPosts(), []);

  return (
    <div className="main">
      <Category />
      <PostList posts={posts} />
    </div>
  );
};

export default withRouter(Main);
