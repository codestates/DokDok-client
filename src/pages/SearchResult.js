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
      <Category />
      <div className="search-result">
        {searchPosts.length === 0 ? (
          <div className="no-result">
            <div>
              <img src="https://i.imgur.com/bmUB2Sb.png" alt="" />
              <div>검색 결과가 없습니다.</div>
            </div>
          </div>
        ) : (
          <div className="result">검색 결과 {searchPosts.length}건</div>
        )}
      </div>
      <PostList posts={searchPosts} />
    </div>
  );
};

export default withRouter(SearchResult);
