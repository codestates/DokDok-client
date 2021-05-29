import '../scss/SearchResult.scss';
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Category from '../components/Category';
import PostList from '../components/PostList';

const SearchResult = ({ searchPosts }) => {
  if (searchPosts === null) {
    return <Redirect to="/main" />;
  }

  return (
    <div className="search-result-box">
      <div className="search-result">
        <Category />
        {searchPosts.length === 0 ? null : (
          <div className="result">검색 결과 {searchPosts.length}건</div>
        )}
        <PostList posts={searchPosts} />
      </div>
    </div>
  );
};

export default withRouter(SearchResult);
