import logo from './logo.svg';
import './App.css';

import Calendar from './component/Calendar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaCloudSun } from 'react-icons/fa';

import PostList from './PostList';
import PostDetail from './PostDetail';
import Weather from './weather';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
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

          <Routes>
            <Route path="/post" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
