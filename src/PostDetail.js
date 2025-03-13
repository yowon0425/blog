import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

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

  return (
    <div>
      {post && (
        <div>
          <h2>{post.title}</h2>
          <img src={post.imageUrl} alt={post.title} />
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
