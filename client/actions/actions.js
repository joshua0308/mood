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
    .then(posts => {
      return dispatch(getPostsActionCreator(posts));
    });
};

export const thunkCreatePost = (entry, username) => dispatch => {
  let newPost = {
    created_on: new Date(),
    username: username,
    mood: 'I wanna go home',
    journal_entry: entry
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
    .then(post => {
      return dispatch(createPostActionCreator(post));
    });
};

export const createPostActionCreator = post => {
  console.log('actions => createPostActionCreator');
  return {
    type: types.CREATE_POST,
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

export const setUserActionCreator = () => {
  console.log('actions => setUserActionCreator');
  return {
    type: types.SET_USER,
    payload: 'new user'
  };
};
