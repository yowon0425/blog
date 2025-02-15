<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = "b0e97724140f26c54ec84685d87b7a95";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Seoul');
  const [error, setError] = useState(null);

  // ✅ 날씨 데이터를 가져오는 함수
  const fetchWeather = async () => {
    if (!location) {
      setError("도시 이름을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=kr`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError('날씨 정보를 가져오는 데 실패했습니다.');
    }
  };

  // ✅ 기본값으로 'Seoul' 날씨를 가져오기
  useEffect(() => {
    fetchWeather();
  }, []);

  // ✅ 기온에 따른 옷차림 추천 함수
  const getClothingRecommendation = (temp) => {
    if (temp >= 30) return "🔥 반팔, 반바지, 모자";
    if (temp >= 20) return "☀️ 가벼운 긴팔, 청바지";
    if (temp >= 10) return "🍂 가벼운 코트, 니트";
    if (temp >= 0) return "🧥 두꺼운 코트, 목도리";
    return "🥶 패딩, 장갑, 털모자";
=======
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
>>>>>>> 4002cb81faebe67beadac63c3dcd1c16320ba911
  };

  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <h1>🌤 {location} 날씨</h1>

        {/* 🔹 입력창 & 버튼 */}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="도시 이름 입력"
        />
        <button onClick={fetchWeather}>날씨 검색</button>

        <div className="weather-container">
          {error && <p>{error}</p>}
          {weather ? (
            <>
              <p>🌡 온도: {weather.main.temp}°C</p>
              <p>☁ 날씨: {weather.weather[0].description}</p>
              <p>💧 습도: {weather.main.humidity}%</p>
              <p>🌬 풍속: {weather.wind.speed} m/s</p>

              {/* 🔥 옷차림 추천 추가 */}
              <p>👕 추천 옷차림: {getClothingRecommendation(weather.main.temp)}</p>
            </>
          ) : (
            <p>날씨 정보를 로딩 중...</p>
          )}
        </div>
      </header>
=======
      <h1>Blog</h1>
      {selectedPost ? (
        <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
      ) : (
        <PostList posts={posts} onSelectPost={setSelectedPost} />
      )}
      {isAddingPost && <AddPost onAddPost={handleAddPost} onClose={() => setIsAddingPost(false)} />}
      <button className="add-button" onClick={() => setIsAddingPost(true)}>추가</button>
>>>>>>> 4002cb81faebe67beadac63c3dcd1c16320ba911
    </div>
  );
}

export default App;
