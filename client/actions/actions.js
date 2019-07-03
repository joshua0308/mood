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

export const thunkCreatePost = newPost => dispatch => {
  newPost = {
    created_on: new Date(),
    username: 'Josh',
    mood: 'I wanna go home',
    journal_entry: newPost
  };
  console.log(newPost);

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
