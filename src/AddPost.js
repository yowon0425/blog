import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title,
        content,
        imageUrl,
        timestamp: new Date().toISOString(),
      };

      // Firebase Firestore에 데이터 저장
      await setDoc(doc(db, 'posts', Date.now().toString()), newPost);
      console.log('게시물 추가 성공!');
      setTitle('');
      setContent('');
      setImageUrl('');
    } catch (error) {
      console.error('게시물 추가 실패:', error);
    }
  };

  return (
    <div>
      <h2>게시물 추가</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="이미지 URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">게시물 추가</button>
      </form>
    </div>
  );
}

export default AddPost;
