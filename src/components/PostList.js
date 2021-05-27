import '../scss/PostList.scss';
import React, { useEffect, useState } from 'react';
import PostListEntry from './PostListEntry';

const PostList = ({ posts }) => {
  const [visiblePostsCount, setVisiblePostsCount] = useState(0);
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    window.addEventListener('scroll', handleResize);
    if (visiblePostsCount === 0) {
      setVisiblePostsCount(20);
    }

    return () => {
      window.removeEventListener('scroll', handleResize);
    };
  });

  useEffect(() => {
    setVisiblePosts(posts.slice(0, visiblePostsCount));
  }, [visiblePostsCount, posts]);

  useEffect(() => {
    setVisiblePostsCount(20);
    setVisiblePosts(posts.slice(0, 20));
  }, [posts]);

  const handleResize = () => {
    const scrollHeight =
      document.documentElement.clientHeight + window.pageYOffset;
    const maxHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );

    if (scrollHeight >= maxHeight && posts.length > visiblePosts.length) {
      setVisiblePostsCount(visiblePostsCount + 20);
    }
  };

  return (
    <div className="post-list">
      {visiblePosts.map((post) => (
        <PostListEntry post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
