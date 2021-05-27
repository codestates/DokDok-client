import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchPosts, setMessageModal } from '../actions/index';

const Search = ({ history }) => {
  const dispatch = useDispatch();
  const [queryString, setQueryString] = useState('');
  const [searchType, setSearchType] = useState('title');
  const postInfo = useSelector((state) => state.postReducer);
  const { posts } = postInfo;

  async function getSearchPosts(type, query) {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/posts/search?${type}=${query}`)
      .then((res) => {
        dispatch(setSearchPosts(res.data.posts));
      })
      .catch((err) => {
        if (err) throw err;
      });
    const searchResults = posts.filter((post) => post[type].includes(query));
    dispatch(setSearchPosts(searchResults));
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
    getSearchPosts(searchType, queryString);
    setQueryString('');
    history.push('/search');
  };

  return (
    <React.Fragment>
      <select name="types" onChange={changeSearchType}>
        <option value="title">제목</option>
        <option value="address">지역</option>
        <option value="author">작성자</option>
      </select>
      <input
        className="search-input"
        type="text"
        value={queryString}
        onChange={changeQueryString}
        onKeyDown={checkKeycode}
        placeholder="검색어를 입력해주세요"
      />
      <button className="search-btn" onClick={getSearchResult}>
        검색
      </button>
    </React.Fragment>
  );
};

export default withRouter(Search);
