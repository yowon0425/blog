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
        <nav>
          <ul>
            <li><Link to="/posts">게시물 보기</Link></li>
            <li><Link to="/signup">회원가입</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts" element={
            <>
              <PostList />
              <AddPost />
            </>
          } />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
