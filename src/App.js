import React, { useState } from 'react';
import './App.css';
import PostList from './PostList';
import PostDetail from './PostDetail';
import AddPost from './AddPost';

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 번째 게시물", imageUrl: "https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg", content: "화난 강아디", timestamp: new Date().toISOString() },
    { id: 2, title: "두 번째 게시물", imageUrl: "https://i.namu.wiki/i/d1A_wD4kuLHmOOFqJdVlOXVt1TWA9NfNt_HA0CS0Y_N0zayUAX8olMuv7odG2FiDLDQZIRBqbPQwBSArXfEJlQ.webp", content: "고양이 조아", timestamp: new Date().toISOString() },
  ]);
  const [isAddingPost, setIsAddingPost] = useState(false);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setIsAddingPost(false);
  };

  return (
    <div className="App">
      <h1>Blog</h1>
      {selectedPost ? (
        <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
      ) : (
        <PostList posts={posts} onSelectPost={setSelectedPost} />
      )}
      {isAddingPost && <AddPost onAddPost={handleAddPost} onClose={() => setIsAddingPost(false)} />}
      <button className="add-button" onClick={() => setIsAddingPost(true)}>추가</button>
    </div>
  );
}

export default App;
