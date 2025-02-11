import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myPage.css";

const Mypage = () => {
  return (
    <div className="container">
      <div className="profile-section">
        <div className="profile-info">
          <div className="profile-img">
            <img src="/basicUser.png" alt="프로필" />
          </div>
          <h4 className="profile-name">이름</h4>
        </div>

        <button className="btn btn-outline-danger">수정 버튼</button>
      </div>

      <hr />

      <div className="row mb-5">
        <div className="col mb-5 mt-5" md={6}>
          <h5>찜 목록</h5>
        </div>
        <div md={6} className="text-end col">
          <a href="#">더보기 →</a>
        </div>
        <div className="d-flex justify-content-around">
          <a href="#">
            <img src="car.jpg" className="mypage_img" />
          </a>
          <a href="#">
            <img src="car.jpg" className="mypage_img" />
          </a>
          <a href="#">
            <img src="car.jpg" className="mypage_img" />
          </a>
        </div>
      </div>

      <div className="mt-5 row">
        <div className="col mb-5" md={6}>
          <h5>찜 목록</h5>
        </div>
        <div md={6} className="text-end col">
          <a href="#">더보기 →</a>
        </div>
        <div className="d-flex justify-content-around">
          <a href="#">
            <img src="car.jpg" className="mypage_img" />
          </a>
          <a href="#">
            <img src="car.jpg" className="mypage_img" />
          </a>
          <a href="#">
            <img src="car.jpg" className="mypage_img" />
          </a>
        </div>
      </div>

      <div className="mt-5 row">
        <div className="text-end col">
          <button className="btn btn-outline-danger" variant="outline-danger">
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
