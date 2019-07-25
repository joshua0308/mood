import * as types from '../constants/actionTypes';

export const getPostsActionCreator = posts => {
  console.log('actions => getPostsActionCreator');
  return {
    type: types.GET_POSTS,
    payload: posts
  };
};

export const thunkGetPosts = () => dispatch => {
  fetch('/api/posts', {
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    referrer: 'no-referrer'
  })
    .then(data => data.json())
    .then(json => {
      console.log('actions => thunkGetPosts => posts', json);
      // if return object from AJAX request has an error in the response object, log the user out
      if (json.hasOwnProperty('error')) {
        console.log('actions => thunkVerifyUser => json.error', json.error);
        return dispatch(verifyUserActionCreator({ error: json.error }));
      }
      return dispatch(getPostsActionCreator(json));
    });
};

export const thunkCreatePost = (entry, username, user_id) => dispatch => {
  let newPost = {
    created_on: new Date(),
    username: username,
    mood: 'I wanna go home',
    journal_entry: entry,
    user_id: user_id
  };
  console.log('actions => thunkCreatePost', entry);

  fetch('/api/posts', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    referrer: 'no-referrer',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  })
    .then(data => data.json())
    .then(json => {
      if (json.hasOwnProperty('error')) {
        console.log('actions => thunkVerifyUser => json.error', json.error);
        return dispatch(thunkLogoutUser());
      }
      return dispatch(createPostActionCreator(json));
    });
};

export const createPostActionCreator = post => {
  console.log('actions => createPostActionCreator');
  return {
    type: types.CREATE_POST,
    payload: post
  };
};

export const thunkDeletePost = post_id => dispatch => {
  console.log('actions => thunkDeletePost', post_id);

  fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    referrer: 'no-referrer',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(data => data.json())
    .then(json => {
      if (json.hasOwnProperty('error')) {
        console.log('actions => thunkVerifyUser => json.error', json.error);
        return dispatch(thunkLogoutUser());
      }
      return dispatch(deletePostActionCreator(json));
    });
};

export const deletePostActionCreator = post => {
  console.log('actions => deletePostActionCreator');
  return {
    type: types.DELETE_POST,
    payload: post
  };
};

export const setNewTextActionCreator = text => {
  console.log('actions => setNewTextActionCreator');
  return {
    type: types.SET_NEW_TEXT,
    payload: text
  };
};

export const verifyUserActionCreator = obj => {
  console.log('actions => verifyUserActionCreator', obj);
  return {
    type: types.VERIFY_USER,
    payload: obj
  };
};

export const thunkVerifyUser = (username, password) => dispatch => {
  let userObj = { username, password };

  // send a post request with given username and password
  fetch('/auth/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    referrer: 'no-referrer',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  })
    .then(data => data.json())
    .then(json => {
      // if the response object has an error property, log the user out
      if (json.hasOwnProperty('error')) {
        console.log('actions => thunkVerifyUser => json.error', json.error);
        return dispatch(verifyUserActionCreator(json));
      }

      // if the user is verified, invoke action creator with user_id and username
      console.log('actions => thunkVerifyUser => json', json);
      return dispatch(
        verifyUserActionCreator({ user_id: json.user_id, username })
      );
    });
};

export const logoutUserActionCreator = () => {
  console.log('actions => logoutUserActionCreator');
  return {
    type: types.LOGOUT_USER,
    payload: 'Log out..'
  };
};

export const thunkLogoutUser = () => dispatch => {
  fetch('/auth/logout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    referrer: 'no-referrer',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ logout: 'true' })
  }).then(() => dispatch(logoutUserActionCreator()));
};

export const setUsernameLoginActionCreator = text => {
  console.log('actions => setUsernameLoginActionCreator');
  return {
    type: types.SET_USERNAME_LOGIN,
    payload: text
  };
};

export const setPasswordLoginActionCreator = text => {
  console.log('actions => setPasswordLoginActionCreator');
  return {
    type: types.SET_PASSWORD_LOGIN,
    payload: text
  };
};
