import '../scss/PostList.scss';
import React, { useEffect, useState } from 'react';
import PostListEntry from './PostListEntry';
import { withRouter } from 'react-router';

const PostList = ({ posts, match }) => {
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
    <React.Fragment>
      {posts.length === 0 ? (
        <React.Fragment>
          {match.path === '/search' ? (
            <div className="no-result">
              <div>
                <img src="https://i.imgur.com/K5RdjzR.png" alt="" />
                <div>검색 결과가 없습니다</div>
              </div>
            </div>
          ) : (
            <div className="no-posts">
              <img src="https://i.imgur.com/VDGfqHZ.png" alt="" />
            </div>
          )}
        </React.Fragment>
      ) : (
        <div className="post-list">
          {visiblePosts.map((post) => (
            <PostListEntry post={post} key={post.id} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(PostList);
