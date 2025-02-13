import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myPage.css";
import { Link, useNavigate } from "react-router-dom";

const Mypage = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const updatedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (updatedUser) {
      setUser(updatedUser);
    }
  }, []);

  const handleDelete = () => {
    const isConfirmed = confirm("정말로 탈퇴 하시겠습니까?");

    if (!isConfirmed) {
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = existingUsers.filter(
      (existingUsers) => existingUsers.email !== user.email
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.removeItem("loggedInUser");
    setUser(null);

    alert("탈퇴가 완료되었습니다.");
    navigate("/");
  };

  const handleAddProduct = () => {
    navigate("/add-product", { state: { user_id: user.user_id } });
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-danger" onClick={handleAddProduct}>
        추가
      </button>
      <div className="row align-items-center">
        <div
          md={3}
          className="sidebar d-flex flex-column justify-content-center"
        >
          <div className="sidebar-section">
            <h5>
              <strong>나의 쇼핑정보</strong>
            </h5>
            <a href="#">
              <p>주문내역</p>
            </a>
            <a href="#">
              <p>찜 리스트</p>
            </a>
            <Link to="/cart">
              <p>장바구니</p>
            </Link>
          </div>
          <hr />
          <div className="sidebar-section">
            <h5>
              <strong>나의 활동</strong>
            </h5>
            <a href="#">
              <p>나의 상품후기</p>
            </a>
            <a href="#">
              <p>나의 상품문의</p>
            </a>
          </div>
          <hr />
          <div className="sidebar-section">
            <h5>
              <strong>나의 정보</strong>
            </h5>
            <Link to="/edit-user" state={{ user }}>
              <p>회원정보 수정</p>
            </Link>
            <button onClick={handleDelete}>회원 탈퇴</button>
          </div>
        </div>

        <div md={9} className="main-content col">
          <div className="profile-section d-flex flex-column justify-content-center">
            <div>
              <img src="/basicUser.png" className="profile-img" />
            </div>
            <div className="d-flex flex-column align-items-center">
              <h3 className="profile-name">{user?.name}</h3>
              <p className="email-text">{user?.email}</p>
            </div>
          </div>

          <hr />

          <div className="section-header">
            <h2 className="fw-bold">최근 주문 내역</h2>
            <a href="#">더보기 &gt;</a>
          </div>
          <div className="d-flex justify-content-around mb-5">
            <a href="#">
              <img src="/lion.png" />
            </a>
            <a href="#">
              <img src="/lion.png" />
            </a>
            <a href="#">
              <img src="/lion.png" />
            </a>
          </div>

          <div className="section-header mt-4 mb-5">
            <h2 className="fw-bold">찜 목록</h2>
            <a href="#">더보기 &gt;</a>
          </div>
          <div className="d-flex justify-content-around">
            <a href="#">
              <img src="/lion.png" />
            </a>
            <a href="#">
              <img src="/lion.png" />
            </a>
            <a href="#">
              <img src="/lion.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
