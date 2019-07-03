import * as types from '../constants/actionTypes';

const initialState = {
  postsList: [],
  newText: ''
};

const feedReducer = (state = initialState, action) => {
  let postsList;

  switch (action.type) {
    case types.GET_POSTS:
      console.log('feedReducer => GET_POSTS', action.payload);

      postsList = [];

      for (let key in action.payload) {
        postsList.unshift(action.payload[key]);
      }
      return { ...state, postsList };

    case types.CREATE_POST:
      console.log('feedReducer => CREATE_POSTS', state);

      // need to make a shallow copy of the updated state for react to re-render
      // postsList = state.postsList.slice();

      // push the new post to the postsList
      // postsList.unshift(action.payload);
      return { ...state };

    case types.SET_NEW_TEXT:
      console.log('feedReducer => SET_NEW_TEXT', state);
      let newText = action.payload;
      return { ...state, newText };

    default:
      return state;
  }
};

export default feedReducer;
