import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('로그인:', { email, password });
      setIsLogged(true);
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit">로그인</button>
      </form>
      {isLogged && <p style={{ color: 'green' }}>로그인 성공!</p>}
      <p>아이디가 없으신가요? <Link to="/signup">회원가입</Link></p>
    </div>
  );
}

export default Login;
