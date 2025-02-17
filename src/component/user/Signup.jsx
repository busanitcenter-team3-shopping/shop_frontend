import React, { useState } from "react";
import "./Signup.css";
import { useLocation, useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingUser = location.state?.user; // 기존 회원 정보

  const [email, setEmail] = useState(existingUser?.email || "");
  const [password, setPassword] = useState(existingUser?.password || "");
  const [confirmPassword, setConfirmPassword] = useState(
    existingUser?.password || ""
  );
  const [name, setName] = useState(existingUser?.name || "");
  const [phone, setPhone] = useState(existingUser?.phone || "");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUser) {
      const updatedUsers = users.map((user) =>
        user.email === existingUser.email
          ? { ...user, password, name, phone }
          : user
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      const updateUser = { ...existingUser, password, name, phone };
      localStorage.setItem("loggedInUser", JSON.stringify(updateUser));

      setUser(updateUser);

      alert("회원정보가 수정되었습니다.");
      navigate("/");
      return;
    }

    // 새 회원 추가
    const isEmailTaken = users.some((user) => user.email === email);

    if (isEmailTaken) {
      setError("이미 존재하는 이메일입니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    let currentId = localStorage.getItem("currentId");
    if (!currentId) {
      currentId = 1;
    } else {
      currentId = parseInt(currentId, 10);
    }

    const newUser = { user_id: currentId, email, password, name, phone };
    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    localStorage.setItem("currentId", currentId + 1);

    console.log(users);
    console.log(newUser);
    setUser(newUser);
    alert("회원가입이 성공적으로 완료되었습니다!");

    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>{existingUser ? "회원수정" : "회원가입"}</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSignup}>
          {existingUser ? (
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
              required={!existingUser} // 수정할땐 바꿔도 되고 안바꿔도 되고의 선택택
            />
          </div>

          {!existingUser && ( // 회원 수정시 비밀번호 확인은 필요가 없음
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
            {existingUser ? "회원정보 수정" : "회원가입"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
