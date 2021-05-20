import {
  SET_POSTS,
  SET_CATEGORY_POSTS,
  SET_SEARCH_POSTS,
  SET_POST,
} from '../actions/index';
import { initialState } from './initialState';

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return Object.assign({}, state, {
        posts: action.payload,
      });

    case SET_CATEGORY_POSTS:
      return Object.assign({}, state, {
        categoryPosts: action.payload,
      });

    case SET_SEARCH_POSTS:
      return Object.assign({}, state, {
        searchPosts: action.payload,
      });

    case SET_POST:
      return Object.assign({}, state, {
        post: action.payload,
      });

    default:
      return state;
  }
};

export default itemReducer;
