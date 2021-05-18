import { SET_POSTS, SET_CATEGORY_POSTS } from '../actions/index';
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

    default:
      return state;
  }
};

export default itemReducer;
