import { combineReducers } from 'redux';
import feedReducer from './feedReducer';

const reducers = combineReducers({
  feed: feedReducer
});

export default reducers;
