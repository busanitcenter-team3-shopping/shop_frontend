import React from "react";
import "./famousBrand.css";

const FamousBrand = () => {
  return (
    <div className="container">
      {" "}
      <h1 className="d-flex justify-content-center fw-bold brand mt-3">
        인기브랜드
      </h1>
      <div className="d-flex justify-content-end">
        <button className="btn btn-link btn-about">더보기 &gt;</button>
      </div>
      <div className="d-flex justify-content-between">
        <a href="#">
          <div className="card">
            <div className="card-img">
              <img src="/lion.png" className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <p className="card-title">Card title</p>
              <p className="card-text mb-0">라이언</p>
              <p className="card-price mb-0">가격 : 25000</p>
            </div>
          </div>
        </a>
        <a href="#">
          <div className="card">
            <div className="card-img">
              <img src="/lion.png" className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <p className="card-title">Card title</p>
              <p className="card-text mb-0">라이언</p>
              <p className="card-price mb-0">가격 : 25000</p>
            </div>
          </div>
        </a>
        <a href="#">
          <div className="card">
            <div className="card-img">
              <img src="/lion.png" className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <p className="card-title">Card title</p>
              <p className="card-text mb-0">라이언</p>
              <p className="card-price mb-0">가격 : 25000</p>
            </div>
          </div>
        </a>
        <a href="#">
          <div className="card">
            <div className="card-img">
              <img src="/lion.png" className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <p className="card-title">Card title</p>
              <p className="card-text mb-0">라이언</p>
              <p className="card-price mb-0">가격 : 25000</p>
            </div>
          </div>
        </a>
        <a href="#">
          <div className="card">
            <div className="card-img">
              <img src="/lion.png" className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <p className="card-title">Card title</p>
              <p className="card-text mb-0">라이언</p>
              <p className="card-price mb-0">가격 : 25000</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default FamousBrand;
