import React from 'react';

function PostDetail({ post, onClose }) {
  return (
    <div className="post-detail">
      <button onClick={onClose}>닫기</button>
      <h2>{post.title}</h2>
      <img src={post.imageUrl} alt={post.title} />
      <p>{post.content}</p>
      <p>작성 시간: {new Date(post.timestamp).toLocaleString()}</p>
    </div>
  );
}

export default PostDetail;
