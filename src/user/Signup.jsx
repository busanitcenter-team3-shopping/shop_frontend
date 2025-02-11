import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
      {/* 회원가입 컨테이너 */}
      <div className="signup-box">
        <h2>회원가입</h2>

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

        {/* 비밀번호 확인 */}
        <div className="input-group">
          <label>비밀번호 확인</label>
          <input type="password" placeholder="비밀번호 확인" />
        </div>

        {/* 이름 입력 */}
        <div className="input-group">
          <label>이름</label>
          <input type="text" placeholder="이름 입력" />
        </div>

        {/* 전화번호 입력 */}
        <div className="input-group">
          <label>전화번호</label>
          <input type="tel" placeholder="전화번호 입력" />
        </div>

        {/* 회원가입 버튼 */}
        <button className="signup-btn">회원가입</button>
      </div>
    </div>
  );
};

export default Signup;
