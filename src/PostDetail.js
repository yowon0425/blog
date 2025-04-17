import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>불러오는 중...</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
      <h2>{post.title}</h2>
      <img
        src={post.imageUrl}
        alt={post.title}
        style={{ width: '100%', borderRadius: '10px', marginTop: '20px' }}
      />
      <p style={{ marginTop: '20px' }}>{post.content}</p>
    </div>
  );
}

export default PostDetail;
