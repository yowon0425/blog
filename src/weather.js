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
  };

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
