import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myPage.css";

const Mypage = () => {
  return (
    <div className="container mt-5">
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
            <a href="#">
              <p>장바구니</p>
            </a>
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
            <a href="#">
              <p>회원정보 수정</p>
            </a>
            <button>회원 탈퇴</button>
          </div>
        </div>

        <div md={9} className="main-content col">
          <div className="profile-section d-flex flex-column justify-content-center">
            <div>
              <img src="/basicUser.png" className="profile-img" />
            </div>
            <div className="d-flex flex-column align-items-center">
              <h3 className="profile-name">이름</h3>
              <p className="email-text">abc@naver.com</p>
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
