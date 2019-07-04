import React from 'react';

const PostDisplay = props => {
  const { post } = props;
  return (
    <div className='post-display'>
      <div className='post-content'>
        username: {post.username}
        <br />
        journal_entry: {post.journal_entry}
        <br />
        mood: {post.mood}
        <br />
        post_id: {post.post_id}
      </div>
    </div>
  );
};

export default PostDisplay;
