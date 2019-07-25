import React from 'react';

const PostDisplay = props => {
  const { post, current_user_id, deletePost } = props;
  return (
    <div className='post-display'>
      <div className='post-content'>
        {/* username: {post.username} */}
        <br />
        {/* journal_entry:  */}
        {post.journal_entry}
        <br />
        {/* user_id: {post.user_id} */}
        <br />
        {/* current_user_id: {current_user_id} */}
        {/* mood: {post.mood} */}
        <br />
        {/* post_id: {post.post_id} */}
        <br />
        {current_user_id == post.user_id ? (
          <button
            className='delete-button'
            onClick={() => {
              console.log('delete button clicked');
              deletePost(post.post_id);
            }}
          >
            Delete
          </button>
        ) : (
          <div>{` `}</div>
        )}
      </div>
    </div>
  );
};

export default PostDisplay;
