import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const user = existingUsers.find(
    (user) => user.email === email && user.password === password
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 입력"
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </div>

          <div className="button-group">
            <button className="login-btn">로그인</button>
            <button className="kakao-login">카카오 로그인</button>
          </div>
        </form>

        <Link to="/signup">
          <p className="signup-link">회원가입</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
