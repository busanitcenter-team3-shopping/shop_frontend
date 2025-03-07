import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";
import api from "../../api/axiosInstance";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const { token, currentUser, setCurrentUser } = useMyContext();

  // 입력 필드 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const phoneRegex = /^01[016789]-\d{4}-\d{4}$/;

  const isEditMode = token && currentUser;

  useEffect(() => {
    if (isEditMode && currentUser) {
      setEmail(currentUser.email);
      setUsername(currentUser.username);
      setPhone(currentUser.phone);
    }
  }, [isEditMode, currentUser]);

  // 회원가입 API 호출
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // 이메일 형식
    if (!isEditMode && !emailRegex.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    // 비밀번호 형식
    if (password && !passwordRegex.test(password)) {
      setError("영문자, 숫자를 포함하여 8자리 이상입력하셔야합니다.");
      return;
    }

    // 전화번호 형식
    if (!phoneRegex.test(phone)) {
      setError("전화번호 형식이 잘못되었습니다");
      return;
    }

    // 비밀번호 확인
    if (!isEditMode && password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      if (isEditMode) {
        // 회원수정
        const response = await api.put(
          `/user/updateuser/${currentUser.userId}`,
          {
            username,
            password: password || undefined,
            phone,
          }
        );

        if (response.status === 200) {
          const usdatedUser = { ...currentUser, username };
          localStorage.setItem("USER", JSON.stringify(usdatedUser));
          setCurrentUser(usdatedUser);
          alert("수정이 완료되었습니다.");
          navigate("/");
        }
      } else {
        // 가입
        try {
          const response = await api.post("/user/createuser", {
            username,
            email,
            password,
            phone,
          });

          if (response.status === 200) {
            alert("회원가입이 되었습니다.");
            navigate("/");
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setError("동일한 이메일이 존재합니다.");
          } else {
            setError("회원가입에 실패했습니다. 다시 시도해주세요.");
          }
        }
      }
    } catch (error) {
      if (error.response) {
        setError(`${error.response.data}`);
      } else {
        setError("네트워크 오류");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>{isEditMode ? "회원수정" : "회원가입"}</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSignup}>
          {isEditMode ? (
            <div></div>
          ) : (
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
          )}

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
          {isEditMode ? (
            <div></div>
          ) : (
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
          )}

          <div className="input-group">
            <label>이름</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            {isEditMode ? "회원수정" : "회원가입"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
