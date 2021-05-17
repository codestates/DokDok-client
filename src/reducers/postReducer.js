import { SET_POSTS } from '../actions/index';
import { initialState } from './initialState';

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return Object.assign({}, state, {
        posts: action.payload,
      });

    default:
      return state;
  }
};

export default itemReducer;
