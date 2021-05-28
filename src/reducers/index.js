import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';
import chattingReducer from './chattingReducer';

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  chattingReducer,
});

export default rootReducer;
