import React from 'react';
import { withRouter } from 'react-router-dom';

const PostListEntry = ({ post, history }) => {
  return (
    <div className="post-entry">
      <div
        className="img-box"
        style={{ backgroundImage: `url(${post.image1})` }}
      ></div>
      <div className="author">{post.title}</div>
      <div>{post.address}</div>
    </div>
  );
};

export default withRouter(PostListEntry);
