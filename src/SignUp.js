import React, { useState } from 'react';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email && password) {
      console.log('회원가입:', { username, email, password });
      setIsSignedUp(true);
      // 가입 성공 후 입력 필드를 초기화
      setUsername('');
      setEmail('');
      setPassword('');
    }
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
      {isSignedUp && <p style={{ color: 'green' }}>가입이 완료되었습니다!</p>}
    </div>
  );
}

export default SignUp;
