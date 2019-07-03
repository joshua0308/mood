import React from 'react';
import PostDisplay from './PostDisplay';

const PostsDisplay = props => {
  const { postsList } = props;

  let postCards = [];
  if (postsList.length > 0) {
    postCards = postsList.map((el, index) => {
      return <PostDisplay key={`post${index}`} content={el.journal_entry} />;
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
