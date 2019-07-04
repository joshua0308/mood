import { combineReducers } from 'redux';
import feedReducer from './feedReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  feed: feedReducer,
  user: userReducer
});

export default reducers;
