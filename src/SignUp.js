import React, { useState } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  provider
} from './firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const db = getFirestore();

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailTrimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailTrimmed)) {
      alert('잘못된 이메일 형식입니다.');
      return;
    }

    if (!username || !emailTrimmed || !password) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailTrimmed, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username,
        email: emailTrimmed,
      });

      setIsSignedUp(true);
      navigate('/post'); // ✅ 회원가입 성공 후 이동
    } catch (error) {
      console.error(error);
      alert('회원가입 실패: ' + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert(`${user.email}님 환영합니다!`);
      navigate('/post'); // ✅ 로그인 성공 후 이동
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`${user.displayName || user.email}님 구글 로그인 성공!`);
      navigate('/post'); // ✅ 구글 로그인 성공 후 이동
    } catch (error) {
      alert('구글 로그인 실패: ' + error.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>회원가입 / 로그인</h2>
        <input
          type="text"
          placeholder="사용자 이름 (회원가입용)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button type="submit">📌 새로 가입하기</button>
          <button onClick={handleLogin}>🔑 로그인하기</button>
          <button type="button" onClick={handleGoogleLogin}>🟢 구글로 로그인</button>
        </div>
        {isSignedUp && <p className="success-message">🎉 회원가입 완료!</p>}
      </form>
    </div>
  );
}

export default SignUp;
