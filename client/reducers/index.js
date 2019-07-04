import { combineReducers } from 'redux';
import feedReducer from './feedReducer';
import authReducer from './authReducer';
// import userReducer from './userReducer';

const reducers = combineReducers({
  feed: feedReducer,
  auth: authReducer
  // user: userReducer,
});

export default reducers;
