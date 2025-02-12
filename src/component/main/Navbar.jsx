import React, { useEffect, useState } from "react";
import "./Navbar.css";
import cart from "../../assets/icon-cart-shopping.svg";
import myuser from "../../assets/icon-user.svg";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("JSON 파싱 오류:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // useEffect(() => {
  //   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  //   if (loggedInUser) {
  //     setUser(loggedInUser);
  //   }
  // }, []);

  const handellogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <div>
      <article className="top-bar bg-secondary bg-opacity-25">
        {user ? (
          <button onClick={handellogout}>로그아웃</button>
        ) : (
          <>
            <Link to="/login" className="me-3 text-dark">
              로그인
            </Link>
            <Link to="signup" className="me-3 text-dark">
              회원가입
            </Link>
          </>
        )}
        <Link to="/service" className="text-dark">
          고객센터
        </Link>
      </article>
      <header className="bg-white pt-5">
        <div className="container text-center">
          <Link to="/" className="fw-bold fs-3 text-dark text-decoration-none">
            로 고
          </Link>
        </div>
      </header>

      <div
        className="container d-flex justify-content-between align-items-center"
        id="nav-container"
      >
        <div>
          <button
            className="btn"
            onClick={() => setShowCategories(!showCategories)}
          >
            ☰ 전체 카테고리
          </button>

          {/* 목록 (showCategories 상태에 따라 보이거나 숨김) */}
          {showCategories && (
            <ul
              className="list-group mt-2"
              style={{
                position: "absolute",
                background: "#fff",
                width: "200px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                zIndex: 100,
              }}
            >
              <li className="list-group-item">
                <Link to="/products" onClick={() => setShowCategories(false)}>
                  상품
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/brand" onClick={() => setShowCategories(false)}>
                  브랜드
                </Link>
              </li>
            </ul>
          )}
        </div>

        <form className="d-flex w-50" style={{ maxWidth: "500px" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="검색"
          />
          <button className="btn btn-outline-secondary">🔍</button>
        </form>

        <ul className="nav-item">
          <li>
            <Link to="/mypage" className="me-3 text-dark">
              <img
                className="mb-2"
                src={myuser}
                alt="myPage"
                height="30"
                width="30"
              />
              <span>마이페이지</span>
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-dark">
              <img
                className="mb-2"
                src={cart}
                alt="cart"
                height="30"
                width="30"
              />
              <span>장바구니</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
