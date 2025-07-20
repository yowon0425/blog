import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaCloudSun, FaNewspaper } from 'react-icons/fa';
import SignUp from './SignUp';
import Calendar from './component/Calendar';
import PostList from './PostList';
import PostDetail from './PostDetail';
import Weather from './weather';
import News from './News';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideBottomNav = location.pathname === '/' || location.pathname === '/signup';

  return (
    <>
      {!hideBottomNav && (
        <nav className="bottom-nav">
          <Link to="/post" className="nav-link">
            <FaHome size={30} />
          </Link>
          <Link to="/calendar" className="nav-link">
            <FaCalendarAlt size={30} />
          </Link>
          <Link to="/weather" className="nav-link">
            <FaCloudSun size={30} />
          </Link>
          <Link to="/news" className="nav-link">
            <FaNewspaper size={30} />
          </Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <Router>
        {/* 🌗 다크모드 전환 버튼 */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            padding: '8px 12px',
            borderRadius: '20px',
            border: 'none',
            background: theme === 'light' ? '#333' : '#fff',
            color: theme === 'light' ? '#fff' : '#333',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {theme === 'light' ? '🌙 다크모드' : '☀️ 라이트모드'}
        </button>

        <AppContent />
      </Router>
    </div>
  );
}

export default App;
