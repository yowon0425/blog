import React, { useState, useEffect } from 'react';
import Post from './Post';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore();

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = collection(db, 'posts');
      const querySnapshot = await getDocs(postsRef);
      const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
