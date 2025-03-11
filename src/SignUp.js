import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from './firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

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

      // 사용자 추가 정보를 Firestore에 저장
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email: emailTrimmed,
      });

      setIsSignedUp(true);
      console.log('회원가입 성공!');
    } catch (error) {
      console.error(error);
      alert('회원가입 실패: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="사용자 이름"
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
        <button type="submit">가입하기</button>
      </form>
      {isSignedUp && <p style={{ color: 'green' }}>회원 가입이 완료되었습니다!</p>}
    </div>
  );
}

export default SignUp;
