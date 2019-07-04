import * as types from '../constants/actionTypes';

const initialState = {
  user_id: 1,
  username: 'Josh Kim'
};

const userReducer = (state = initialState, action) => {
  let username;

  switch (action.type) {
    case types.SET_USER:
      console.log('userReducer => SET_USER', action.payload);

      username = action.payload;
      return { ...state, username };
    default:
      return state;
  }
};

export default userReducer;
