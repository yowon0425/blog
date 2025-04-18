import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

function Post({ post, onDelete }) {
  return (
    <div className="post">
      <Link to={`/post/${post.id}`}>
        <img src={post.imageUrl} alt={post.title} />
      </Link>
      <div className="post-footer">
        <span>{post.title}</span>
        <button className="delete-btn" onClick={onDelete}>삭제</button>
      </div>
    </div>
  );
}

export default Post;
