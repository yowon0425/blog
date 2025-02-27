import React, { useState } from 'react';
import './App.css'; // CSS 파일을 따로 만들어 스타일을 관리할 수 있습니다.

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 실제 회원가입 로직을 구현합니다.
    console.log('회원가입:', { username, email, password });
    // 회원가입 성공 후 처리 (예: 홈페이지로 리다이렉트)
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
