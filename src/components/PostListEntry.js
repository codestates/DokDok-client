import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setPost } from '../actions';

const PostListEntry = ({ post, history }) => {
  const dispatch = useDispatch();

  const redirectToPostDetail = () => {
    dispatch(setPost(post));
    history.push('/post');
  };

  return (
    <div className="post-entry" onClick={redirectToPostDetail}>
      <div className="img-box">
        <img src={post.image1} alt="" />
      </div>
      <div className="info-box">
        <div className="author">{post.title}</div>
        <div>{post.address}</div>
      </div>
    </div>
  );
};

export default withRouter(PostListEntry);
