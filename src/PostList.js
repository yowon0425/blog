// PostList.js - 사용자별 게시물만 조회하도록 수정

import React, { useState, useEffect } from 'react';
import Post from './Post';
import Profile from './Profile';
import { db, auth } from './firebase';
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, 'posts'), where('uid', '==', user.uid));
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      alert('삭제 실패: ' + err.message);
    }
  };

  const handleUpload = async () => {
    const user = auth.currentUser;
    const title = prompt("게시글 제목:");
    const content = prompt("내용:");
    const imageUrl = prompt("이미지 URL:");

    if (!user || !title || !content || !imageUrl) {
      alert("모든 값을 입력해주세요.");
      return;
    }

    try {
      const newPost = {
        title,
        content,
        imageUrl,
        timestamp: serverTimestamp(),
        uid: user.uid
      };

      const docRef = await addDoc(collection(db, 'posts'), newPost);
      setPosts(prev => [{ id: docRef.id, ...newPost }, ...prev]);
    } catch (err) {
      alert("게시글 업로드 실패: " + err.message);
    }
  };

  return (
    <div className="page-wrapper">
      <Profile showSettings={true} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>게시물 목록</h3>
        <button className="upload-btn" onClick={handleUpload}>➕ 새 게시물 올리기</button>
      </div>

      <div className="post-grid">
        {posts.map((post) => (
          <Post key={post.id} post={post} onDelete={() => handleDelete(post.id)} />
        ))}
      </div>
    </div>
  );
}

export default PostList;