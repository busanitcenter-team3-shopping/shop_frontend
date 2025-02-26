import React, { useEffect, useState } from "react";
import "./Navbar.css";
import note from "../../assets/icon-envelope.svg";
import myuser from "../../assets/icon-user.svg";
import plus from "../../assets/icon-plus.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";

const categories = [
  { id: 1, name: "전체" },
  { id: 2, name: "IT" },
  { id: 3, name: "의류" },
  { id: 4, name: "문구" },
  { id: 5, name: "악기" },
];

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setToken } = useMyContext();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
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
    //관리자
    const storedAdmin = localStorage.getItem("ADMIN_USER");
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error("관리자 JSON 파싱 오류:", error);
        setAdmin(null);
      }
    } else {
      setAdmin(null);
    }
  }, [location, setUser]);

  const handellogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    setUser(null);
    setToken(null);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  //관리자
  const handleAdminLogout = () => {
    localStorage.removeItem("ADMIN_JWT_TOKEN");
    localStorage.removeItem("ADMIN_USER");
    setAdmin(null);
    alert("관리자 로그아웃 되었습니다.");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(
        `/products?category=전체&search=${encodeURIComponent(searchQuery)}`
      );
      setSearchQuery(""); // 검색 후 검색창 비우기
    }
  };

  return (
    <div>
      <article className="top-bar bg-secondary bg-opacity-25">
        {/* 만약 관리자 또는 일반 사용자가 로그인 중이면 로그인/회원가입 링크는 사라짐 */}
        {user ? (
          <button onClick={handellogout}>로그아웃</button>
        ) : admin ? (
          <button onClick={handleAdminLogout}>로그아웃</button>
        ) : (
          <>
            <Link to="/login" className="me-3 text-dark">
              로그인
            </Link>
            <Link to="/signup" className="me-3 text-dark">
              회원가입
            </Link>
            <Link to="/adminlogin" className="me-3 text-dark">
              관리자
            </Link>
          </>
        )}
        <Link to="/notice-board" className="text-dark">
          공지사항
        </Link>
      </article>
      <header className="bg-white pt-5">
        <div className="container text-center nav-container">
          <Link to="/" className="fw-bold fs-3 text-dark text-decoration-none">
            <img src="../src/assets/logo.png" style={{ width: "100px" }} />
          </Link>
        </div>
      </header>

      <div
        className="container d-flex justify-content-between align-items-center"
        id="nav-container"
        style={{ marginTop: "40px" }}
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
            <ul className="list-group">
              {categories.map((category) => (
                <li key={category.id} className="list-group-item">
                  <Link
                    to={`/products?category=${category.name}`} // ✅ URL에 카테고리 쿼리 추가
                    onClick={() => setShowCategories(false)} // ✅ 클릭 후 목록 숨기기
                    className="category-link"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form
          className="d-flex w-50"
          style={{ maxWidth: "500px" }}
          onSubmit={handleSearch}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit">
            🔍
          </button>
        </form>

        <ul className="nav-item">
          <li>
            <Link
              to="/add-product"
              className="text-dark"
              state={{ user_id: user?.user_id }}
            >
              <img
                className="mb-2"
                src={plus}
                alt="heart"
                height="30"
                width="30"
              />
              <span>상품등록</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage" className="text-dark">
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
            <Link to="/note" className="text-dark">
              <img
                className="mb-2"
                src={note}
                alt="note"
                height="30"
                width="30"
              />
              <span>메세지</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
