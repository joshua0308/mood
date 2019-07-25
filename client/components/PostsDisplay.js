import React from 'react';
import PostDisplay from './PostDisplay';

const PostsDisplay = props => {
  const { postsList, current_user_id, deletePost } = props;

  let postCards = [];
  if (postsList.length > 0) {
    postCards = postsList.map((el, index) => {
      return (
        <PostDisplay
          key={`post${index}`}
          post={el}
          current_user_id={current_user_id}
          deletePost={deletePost}
        />
      );
    });
  }
  return (
    <div className='posts-display'>
      {postCards.length > 0 && <h4>Feed</h4>}
      {postCards}
    </div>
  );
};

export default PostsDisplay;
