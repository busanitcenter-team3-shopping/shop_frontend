import React, { useState } from "react";
import "./Navbar.css";
import cart from "./assets/icon-cart-shopping.svg";
import user from "./assets/icon-user.svg";

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div>
      {/* 최상단 바 */}
      <article className="top-bar bg-secondary bg-opacity-25">
        <a href="#" className="me-3 text-dark">
          로그인
        </a>
        <a href="#" className="me-3 text-dark">
          회원가입
        </a>
        <a href="#" className="text-dark">
          고객센터
        </a>
      </article>
      {/* 헤더 */}
      <header className="bg-white pt-5">
        <div className="container text-center">
          <a href="#" className="fw-bold fs-3 text-dark text-decoration-none">
            로 고
          </a>
        </div>
      </header>
      {/* 네비게이션 */}

      <div className="container d-flex justify-content-between align-items-center">
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
                <a href="#">상품</a>
              </li>
              <li className="list-group-item">
                <a href="#">브랜드</a>
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
            <a href="#" className="me-3 text-dark">
              <img
                className="mb-2"
                src={user}
                alt="myPage"
                height="30"
                width="30"
              />
              <span>마이페이지</span>
            </a>
          </li>
          <li>
            <a href="#" className="text-dark">
              <img
                className="mb-2"
                src={cart}
                alt="cart"
                height="30"
                width="30"
              />
              <span>장바구니</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
