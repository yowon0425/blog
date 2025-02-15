import React from 'react';

function Post({ imageUrl, onClick }) {
  return (
    <div className="post" onClick={onClick}>
      <img src={imageUrl} alt="Post" />
    </div>
  );
}

export default Post;
