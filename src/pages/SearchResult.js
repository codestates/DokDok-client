import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

const SearchResult = ({ searchPosts, searchKeyword }) => {
  // if (searchPosts === null) {
  //   return <Redirect to="/main" />;
  // }

  return (
    <div className="search-result-box">
      {/* <div className="search-headder">{searchKeyword}</div>
      <div className="search-result">
        {searchPosts.length === 0 ? (
          <div className="no-serch-result">
            <div>검색 결과 0건</div>
          </div>
        ) : (
          <div>검색 결과 {searchPosts.length}건</div>
        )}
      </div> */}
      <p>search</p>
      {/* 포스트리스트 추가 */}
    </div>
  );
};

export default withRouter(SearchResult);
