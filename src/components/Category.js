import '../scss/Category.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { setCategoryPosts } from '../actions/index';

const Category = ({ match }) => {
  const dispatch = useDispatch();

  const postInfo = useSelector((state) => state.postReducer);
  const { posts, searchPosts } = postInfo;

  const setCategory = (e) => {
    let filterPosts = [];
    if (match.path === '/main') {
      if (e.target.value === 10) {
        filterPosts = posts;
      } else {
        filterPosts = posts.filter((post) => e.target.value === post.type);
      }
    } else {
      if (e.target.value === 10) {
        filterPosts = searchPosts;
      } else {
        filterPosts = searchPosts.filter(
          (post) => e.target.value === post.type,
        );
      }
    }

    dispatch(setCategoryPosts(filterPosts));
  };

  return (
    <React.Fragment>
      <div className="category">
        <div className="swipe-finger">
          <img
            src="https://static.thenounproject.com/png/74544-200.png"
            alt=""
          />
        </div>
        <li value="10" onClick={setCategory}>
          전체
        </li>
        <li value="0" onClick={setCategory}>
          총류
        </li>
        <li value="1" onClick={setCategory}>
          철학
        </li>
        <li value="2" onClick={setCategory}>
          종교
        </li>
        <li value="3" onClick={setCategory}>
          사회과학
        </li>
        <li value="4" onClick={setCategory}>
          자연과학
        </li>
        <li value="5" onClick={setCategory}>
          기술과학
        </li>
        <li value="6" onClick={setCategory}>
          예술
        </li>
        <li value="7" onClick={setCategory}>
          언어
        </li>
        <li value="8" onClick={setCategory}>
          문학
        </li>
        <li value="9" onClick={setCategory}>
          역사
        </li>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Category);
