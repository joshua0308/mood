import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostCreator from '../components/PostCreator';
import PostsDisplay from '../components/PostsDisplay';

import {
  getPostsActionCreator,
  createPostActionCreator,
  setNewTextActionCreator,
  thunkGetPosts,
  thunkCreatePost
} from '../actions/actions';

const mapStateToProps = store => {
  console.log('FeedContainer => mapStateToProps => store.feed', store.feed);
  const { postsList, newText } = store.feed;
  return { postsList, newText };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => {
      console.log('FeedContainer => mapDispatchToProps => getPosts');
      return dispatch(thunkGetPosts());
    },
    createPost: post => {
      console.log('FeedContainer => mapDispatchToProps => createPost');
      return dispatch(thunkCreatePost(post));
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
    this.props.getPosts();
  }

  render() {
    console.log('FeedContainer => render', this.props.postsList);
    return (
      <div className='feed-container'>
        <button onClick={this.props.getPosts}>Get Posts</button>
        <PostCreator
          createPost={this.props.createPost}
          setNewText={this.props.setNewText}
          newText={this.props.newText}
        />
        <PostsDisplay postsList={this.props.postsList} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);
