import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./famousProduct.css";
import { Link } from "react-router-dom";

const FamousProduct = () => {
  const [like, setLike] = useState(Array(8).fill(false));

  const toggleHeart = (index) => {
    setLike((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };
  return (
    <div className="container">
      <h1 className="d-flex justify-content-center fw-bold mt-3">인기상품</h1>
      <div className="d-flex justify-content-end">
        <Link to="/products" className="btn btn-link btn-about">
          더보기 &gt;
        </Link>
      </div>

      <div className="row">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="col-md-3 mb-4">
            <Link to="/product">
              <div className="card">
                <div className="position-relative card-img">
                  <img src="/lion.png" className="card-img-top" alt="..." />
                  <img
                    src={like[index] ? "/colorHeart.png" : "/heart.png"}
                    style={{ width: "30px", height: "30px" }}
                    className="position-absolute bottom-0 end-0 p-1 btn heart"
                    alt="heart"
                    onClick={(e) => {
                      e.preventDefault(); // a 태그의 기본 동작 방지
                      toggleHeart(index);
                    }}
                  />
                </div>
                <div className="card-body">
                  <p className="card-title">Card title</p>
                  <p className="card-text mb-0">라이언</p>
                  <p className="card-price mb-0">가격 : 25000</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamousProduct;
