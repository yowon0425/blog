import React from 'react';
import { Link } from 'react-router-dom';

function Post({ post }) {
  return (
    <div className="post">
      <Link to={`/post/${post.id}`}>
        <img src={post.imageUrl} alt={post.title} />
      </Link>
    </div>
  );
}

export default Post;
