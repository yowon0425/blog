import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaCloudSun } from 'react-icons/fa';
import SignUp from './SignUp';
import Calendar from './component/Calendar';
import PostList from './PostList';
import PostDetail from './PostDetail';
import Weather from './weather';

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
        </nav>
      )}

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
