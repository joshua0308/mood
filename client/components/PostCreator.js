import React from 'react';

const PostCreator = props => {
  const { setNewText, createPost, newText, username } = props;
  console.log('PostCreator => props.username', username);
  return (
    <div className='post-creator'>
      {/* <h4>Write a Journal Entry</h4> */}
      <textarea
        rows='12'
        cols='55'
        placeholder={`What's on your mind, ${username.split(' ')[0]}?`}
        onChange={e => setNewText(e.target.value)}
      />
      <button
        onClick={() => {
          console.log('PostCreator => onClick', newText);
          console.log('PostCreator => onClick', username);
          createPost(newText, username);
          document.querySelector('textarea').value = '';
        }}
      >
        Share
      </button>
    </div>
  );
};

export default PostCreator;
