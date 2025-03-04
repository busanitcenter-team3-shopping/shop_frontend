import React, { useEffect, useState } from "react";
import "./Navbar.css";
import note from "../../assets/icon-envelope.svg";
import myuser from "../../assets/icon-user.svg";
import plus from "../../assets/icon-plus.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";

const reverseCategoryMap = {
  전체: "ALL",
  의류: "CLOTHING",
  IT: "IT",
  문구: "STATIONERY",
  악기: "INSTRUMENT",
};

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setToken, currentUser,setCurrentUser } = useMyContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8090/enum")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

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
  }, [location, setUser]);

  useEffect(() => {
    setShowCategories(false); // 페이지 변경되면 닫기
  }, [location.pathname]);

  const handellogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("currentUser");
    setUser(null);
    setToken(null);
    setCurrentUser(null);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(
        `/product?category=ALL&search=${encodeURIComponent(searchQuery)}`
      );
      setSearchQuery("");
    }
  };

  const handleCategoryClick = (category) => {
    const categoryEnglish = reverseCategoryMap[category.name] || category.name;
    navigate(`/product?category=${categoryEnglish}&search=`);
    setShowCategories(false);
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
            <Link to="/signup" className="me-3 text-dark">
              회원가입
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
            <img
              src="../src/assets/logo.png"
              style={{ width: "100px" }}
              alt="Logo"
            />
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
          {showCategories && (
            <ul className="list-group">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
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
              state={{ user_id: user?.userId }}
            >
              <img
                className="mb-2"
                src={plus}
                alt="상품등록"
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
                alt="마이페이지"
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
                alt="메시지"
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
