import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Post from './Post';
import Profile from './Profile';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = collection(db, 'posts');
      const querySnapshot = await getDocs(postsRef);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="page-wrapper">
      <Profile showSettings={true} />

      <div className="post-grid">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
