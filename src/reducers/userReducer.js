import {
  SET_IS_LOGIN,
  SET_LOGIN_MODAL,
  SET_USERINFO,
  SET_MESSAGE_MODAL,
} from '../actions/index';
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

    case SET_LOGIN_MODAL:
      return Object.assign({}, state, {
        isLoginModalOpen: action.payload,
      });

    case SET_MESSAGE_MODAL:
      return Object.assign({}, state, {
        messageModal: {
          ...action.payload,
        },
      });

    default:
      return state;
  }
};

export default itemReducer;
