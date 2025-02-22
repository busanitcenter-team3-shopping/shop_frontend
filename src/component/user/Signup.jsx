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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const phoneRegex = /^01[016789]-\d{4}-\d{4}$/;

  // 회원가입 API 호출
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // 이메일 형식
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    // 비밀번호 형식
    if (!passwordRegex.test(password)) {
      setError("영문자, 숫자를 포함하여 8자리 이상입력하셔야합니다.");
      return;
    }

    // 전화번호호 형식
    if (!phoneRegex.test(phone)) {
      setError("영문자, 숫자를 포함하여 8자리 이상입력하셔야합니다.");
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await api.post("/createuser", {
        name,
        email,
        password,
        phone,
      });

      if (response.status === 200) {
        alert("회원가입이 되었습니다.");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("동일한 이메일이 존재합니다.");
      } else {
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
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
            <label>전화번호(-포함)</label>
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
