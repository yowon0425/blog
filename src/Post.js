import React from 'react';
import { Link } from 'react-router-dom';

function Post({ post }) {
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="post">
      <Link to={`/post/${post.id}`}>
        <img
          src={post.imageUrl || fallbackImage}
          alt={post.title || "이미지"}
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
        />
      </Link>
    </div>
  );
}

export default Post;
