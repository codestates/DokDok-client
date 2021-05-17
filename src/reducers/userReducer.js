import { SET_IS_LOGIN, SET_USERINFO } from '../actions/index';
import { initialState } from './initialState';

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGIN:
      return Object.assign({}, state, {
        isLogin: action.payload.isLogin,
      });

    case SET_USERINFO:
      return Object.assign({}, state, {
        userinfo: action.payload,
      });

    default:
      return state;
  }
};

export default itemReducer;
