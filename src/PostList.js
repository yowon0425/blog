import React from 'react';
import Post from './Post';

function PostList({ posts, onSelectPost }) {
  return (
    <div className="post-list">
      {posts.map(post => (
        <Post key={post.id} imageUrl={post.imageUrl} onClick={() => onSelectPost(post)} />
      ))}
    </div>
  );
}

export default PostList;
