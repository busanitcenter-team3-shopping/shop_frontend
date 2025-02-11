import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      {/* 로그인 컨테이너 */}
      <div className="login-box">
        <h2>로그인</h2>

        {/* 이메일 입력 */}
        <div className="input-group">
          <label>이메일</label>
          <input type="email" placeholder="이메일 입력" />
        </div>

        {/* 비밀번호 입력 */}
        <div className="input-group">
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호 입력" />
        </div>

        {/* 버튼 그룹 */}
        <div className="button-group">
          <button className="login-btn">로그인</button>
          <button className="kakao-login">카카오 로그인</button>
        </div>

        {/* 회원가입 */}
        <p className="signup-link">회원가입</p>
      </div>
    </div>
  );
};

export default Login;
