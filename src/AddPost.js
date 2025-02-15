import React, { useState } from 'react';

function AddPost({ onAddPost, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      content,
      imageUrl: image,
      timestamp: new Date().toISOString()
    };
    onAddPost(newPost);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>새 게시물 작성</h2>
        <form onSubmit={handleSubmit} className="add-post-form">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {image && <img src={image} alt="Preview" className="image-preview" />}
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="form-buttons">
            <button type="submit">게시</button>
            <button type="button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
