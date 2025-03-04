import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";
import api from "../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useMyContext();
  const navigate = useNavigate();

  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      email: decodedToken.role,
    };
    localStorage.setItem("JWT_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));
    setToken(token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/login", { email, password });
      alert("로그인이 되었습니다.");
      if (response.status === 200 && response.data.jwtToken) {
        setJwtToken(response.data.jwtToken);
        const decodedToken = jwtDecode(response.data.jwtToken);
        handleSuccessfulLogin(
          response.data.jwtToken,
          decodedToken,
          response.data.role
        );

        handleSuccessfulLogin(response.data.jwtToken, decodedToken);

        navigate("/");
      } else {
        setError("로그인 실패! 유저네임과 패스워드를 확인하십시오.");
      }
    } catch (error) {
      setError("로그인 실패! 에러가 발생하였습니다.");

      if (error.response && error.response.status === 401) {
        setError("로그인 실패! 유저네임과 패스워드를 확인하십시오.");
      } else {
        setError("로그인 실패! 에러가 발생하였습니다.");
      }
    } finally {
      setLoading(false);
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
