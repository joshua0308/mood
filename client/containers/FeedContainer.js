import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostCreator from '../components/PostCreator';
import PostsDisplay from '../components/PostsDisplay';

import {
  setNewTextActionCreator,
  thunkGetPosts,
  thunkCreatePost,
  thunkDeletePost
} from '../actions/actions';

const mapStateToProps = store => {
  console.log('FeedContainer => mapStateToProps => store.feed', store.feed);
  console.log('FeedContainer => mapStateToProps => store.auth', store.auth);
  const { postsList, newText } = store.feed;
  // const { user_id, username } = store.user;
  const { user_id: current_user_id, username } = store.auth;
  return { postsList, newText, current_user_id, username };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => {
      console.log('FeedContainer => mapDispatchToProps => getPosts');
      return dispatch(thunkGetPosts());
    },
    createPost: (entry, username, user_id) => {
      console.log('FeedContainer => mapDispatchToProps => createPost');
      return dispatch(thunkCreatePost(entry, username, user_id));
    },
    deletePost: post_id => {
      console.log('FeedContainer => mapDispatchToProps => deletePost');
      return dispatch(thunkDeletePost(post_id));
    },
    setNewText: text => {
      console.log('FeedContainer => mapDispatchToProps => setNewText');
      return dispatch(setNewTextActionCreator(text));
    }
  };
};

class FeedContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setInterval(() => {
      this.props.getPosts();
    }, 200);
    // this.props.getPosts();
  }

  render() {
    console.log('FeedContainer => render', this.props.postsList);
    return (
      <div className='feed-container'>
        <br />
        <button onClick={this.props.getPosts}>Get Posts</button>
        <PostCreator
          createPost={this.props.createPost}
          setNewText={this.props.setNewText}
          newText={this.props.newText}
          username={this.props.username}
          current_user_id={this.props.current_user_id}
        />
        <PostsDisplay
          postsList={this.props.postsList}
          current_user_id={this.props.current_user_id}
          deletePost={this.props.deletePost}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);
