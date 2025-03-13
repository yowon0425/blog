import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, signInWithPopup, provider } from './firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공!');
      navigate('/posts'); // 로그인 성공 시 PostList 페이지로 이동
    } catch (error) {
      console.error(error);
      alert('로그인 실패: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google 로그인 성공:', user);
      navigate('/posts'); // 로그인 성공 시 PostList 페이지로 이동
    } catch (error) {
      console.error('Google 로그인 실패:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
      <button onClick={handleGoogleLogin}>Google로 로그인</button>
      <p>아이디가 없으신가요? <Link to="/signup">회원가입</Link></p>
    </div>
  );
}

export default Login;
