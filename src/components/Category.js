import '../scss/Category.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { setCategoryPosts } from '../actions/index';

const Category = ({ match }) => {
  const dispatch = useDispatch();

  const postInfo = useSelector((state) => state.postReducer);
  const { posts, searchPosts } = postInfo;
  const [activeCategory, setActiveCategory] = useState(10);

  const setCategory = (e) => {
    setActiveCategory(e.target.value);
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
        <li
          value="10"
          className={activeCategory === 10 ? 'active' : null}
          onClick={setCategory}
        >
          전체
        </li>
        <li
          value="0"
          className={activeCategory === 0 ? 'active' : null}
          onClick={setCategory}
        >
          총류
        </li>
        <li
          value="1"
          className={activeCategory === 1 ? 'active' : null}
          onClick={setCategory}
        >
          철학
        </li>
        <li
          value="2"
          className={activeCategory === 2 ? 'active' : null}
          onClick={setCategory}
        >
          종교
        </li>
        <li
          value="3"
          className={activeCategory === 3 ? 'active' : null}
          onClick={setCategory}
        >
          사회과학
        </li>
        <li
          value="4"
          className={activeCategory === 4 ? 'active' : null}
          onClick={setCategory}
        >
          자연과학
        </li>
        <li
          value="5"
          className={activeCategory === 5 ? 'active' : null}
          onClick={setCategory}
        >
          기술과학
        </li>
        <li
          value="6"
          className={activeCategory === 6 ? 'active' : null}
          onClick={setCategory}
        >
          예술
        </li>
        <li
          value="7"
          className={activeCategory === 7 ? 'active' : null}
          onClick={setCategory}
        >
          언어
        </li>
        <li
          value="8"
          className={activeCategory === 8 ? 'active' : null}
          onClick={setCategory}
        >
          문학
        </li>
        <li
          value="9"
          className={activeCategory === 9 ? 'active' : null}
          onClick={setCategory}
        >
          역사
        </li>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Category);
