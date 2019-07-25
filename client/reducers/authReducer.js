import * as types from '../constants/actionTypes';

const initialState = {
  isAuthenticated: true,
  redirectToReferrer: false,
  usernameLogin: '',
  passwordLogin: '',
  user_id: null,
  username: '',
  loginErrorMessage: ''
};

const authReducer = (state = initialState, action) => {
  let isAuthenticated,
    redirectToReferrer,
    usernameLogin,
    passwordLogin,
    user_id,
    username,
    loginErrorMessage;
  switch (action.type) {
    case types.VERIFY_USER:
      if (action.payload.hasOwnProperty('error')) {
        isAuthenticated = false;
        redirectToReferrer = false;
        loginErrorMessage = action.payload.error;
      } else {
        isAuthenticated = true;
        redirectToReferrer = true;
        username = action.payload.username;
        user_id = action.payload.user_id;
      }
      return {
        ...state,
        isAuthenticated,
        redirectToReferrer,
        username,
        user_id,
        loginErrorMessage
      };

    case types.LOGOUT_USER:
      isAuthenticated = false;
      redirectToReferrer = false;
      username = '';
      user_id = null;

      return {
        ...state,
        isAuthenticated,
        redirectToReferrer,
        username,
        user_id
      };

    case types.SET_USERNAME_LOGIN:
      usernameLogin = action.payload;
      return { ...state, usernameLogin };

    case types.SET_PASSWORD_LOGIN:
      passwordLogin = action.payload;
      return { ...state, passwordLogin };
    default:
      return state;
  }
};

export default authReducer;
