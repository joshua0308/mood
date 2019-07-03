import React from 'react';

const PostCreator = props => {
  const { setNewText, createPost, newText } = props;
  return (
    <div className='post-creator'>
      {/* <h4>Write a Journal Entry</h4> */}
      <textarea
        rows='12'
        cols='55'
        placeholder="What's on your mind, Josh?"
        onChange={e => setNewText(event.target.value)}
      />
      <button
        onClick={() => {
          console.log('PostCreator => onClick', newText);
          createPost(newText);
          document.querySelector('textarea').value = '';
        }}
      >
        Share
      </button>
    </div>
  );
};

export default PostCreator;
