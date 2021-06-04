import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setSearchPosts,
  setMessageModal,
  setCategoryPosts,
  setIsLoading,
} from '../actions/index';

const Search = ({ history }) => {
  const dispatch = useDispatch();
  const [queryString, setQueryString] = useState('');
  const [searchType, setSearchType] = useState('title');

  async function getSearchPosts(type, query) {
    dispatch(setIsLoading(true));
    await axios
      .get(`${process.env.REACT_APP_API_URL}/posts/search?${type}=${query}`)
      .then((res) => {
        dispatch(setSearchPosts(res.data.data.reverse()));
        history.push('/search');
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  const changeQueryString = (e) => {
    setQueryString(e.target.value);
  };

  const changeSearchType = (e) => {
    setSearchType(e.target.value);
  };

  const checkKeycode = (e) => {
    if (e.keyCode === 13) {
      getSearchResult();
    }
  };

  const getSearchResult = () => {
    if (queryString === '') {
      dispatch(setMessageModal(true, '검색어를 입력해주세요.'));
      return;
    }
    dispatch(setCategoryPosts(null));
    getSearchPosts(searchType, queryString);
    setQueryString('');
  };

  return (
    <React.Fragment>
      <div>
        <select name="types" onChange={changeSearchType}>
          <option value="title">제목</option>
          <option value="address">지역</option>
          <option value="nickname">작성자</option>
        </select>
        <input
          className="search-input"
          type="text"
          value={queryString}
          onChange={changeQueryString}
          onKeyDown={checkKeycode}
          placeholder="검색어를 입력해주세요"
        />
      </div>

      <i className="fas fa-search" onClick={getSearchResult}></i>
    </React.Fragment>
  );
};

export default withRouter(Search);
