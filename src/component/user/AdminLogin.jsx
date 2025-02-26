import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

const AdminLogin = ({ setAdminUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSuccessfulLogin = (token, decodedToken) => {
    // 관리자 정보 처리 예시
    const admin = {
      username: decodedToken.sub,
    };
    localStorage.setItem("ADMIN_JWT_TOKEN", token);
    localStorage.setItem("ADMIN_USER", JSON.stringify(admin));
    // 관리자 대시보드 등으로 이동
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/admin/login", { email, password });
      if (response.status === 200 && response.data.jwtToken) {
        const decodedToken = jwtDecode(response.data.jwtToken);
        handleSuccessfulLogin(response.data.jwtToken, decodedToken);
      } else {
        setError("로그인 실패! 관리자 이메일과 비밀번호를 확인하십시오.");
      }
    } catch (error) {
      setError("로그인 실패! 에러가 발생하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>관리자 로그인</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="관리자 이메일 입력"
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              autoComplete="current-password"
            />
          </div>

          <div className="button-group">
            <button className="login-btn" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
