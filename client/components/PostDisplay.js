import React from 'react';

const PostDisplay = props => {
  const { content } = props;
  return (
    <div className='post-display'>
      <br />
      <br />
      {content}
    </div>
  );
};

export default PostDisplay;
