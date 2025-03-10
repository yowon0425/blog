import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import PostList from './PostList';
import PostDetail from './PostDetail';
import AddPost from './AddPost';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts" element={
            <>
              <h1>게시물 목록</h1>
              {/* 게시물 목록 및 추가 기능 구현 */}
              <PostList />
              <AddPost />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
