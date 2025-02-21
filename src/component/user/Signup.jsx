import React, { useState } from "react";
import "./Signup.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api/axiosInstance";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();

  // 입력 필드 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // 회원가입 API 호출
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 백엔드 API 호출
      const response = await api.post("/createuser", {
        name,
        email,
        password,
        phone,
      });

      // 응답 확인 후 처리
      if (response.status === 200) {
        alert("회원가입이 성공적으로 완료되었습니다!");
        navigate("/login"); // 회원가입 후 로그인 페이지로 이동
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>회원가입</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 입력"
              required
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              required
            />
          </div>

          <div className="input-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              required
            />
          </div>

          <div className="input-group">
            <label>이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
              required
            />
          </div>

          <div className="input-group">
            <label>전화번호</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="전화번호 입력"
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
