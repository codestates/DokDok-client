import '../scss/PostList.scss';
import React from 'react';
import PostListEntry from './PostListEntry';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostListEntry post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
