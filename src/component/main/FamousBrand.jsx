import React from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./famousBrand.css";
import { Link } from "react-router-dom";

const FamousBrand = () => {
  return (
    <div className="container famous-container mt-5">
      {" "}
      <h1 className="d-flex justify-content-center fw-bold brand mt-3">
        인기브랜드
      </h1>
      <div className="d-flex justify-content-end">
        <Link to="/brand-list" className="btn btn-link btn-about">
          더보기 &gt;
        </Link>
      </div>
      <div className="d-flex justify-content-between">
        <Link to="/brand">
          <div>
            <div className="">
              <img src="/lion.png" className="brand_img" alt="..." />
            </div>
            <p className="brand_name d-flex justify-content-center mt-2">
              브랜드
            </p>
          </div>
        </Link>
        <Link to="/brand">
          <div>
            <div className="">
              <img src="/lion.png" className="brand_img" alt="..." />
            </div>
            <p className="brand_name d-flex justify-content-center mt-2">
              브랜드
            </p>
          </div>
        </Link>
        <Link to="/brand">
          <div>
            <div className="">
              <img src="/lion.png" className="brand_img" alt="..." />
            </div>
            <p className="brand_name d-flex justify-content-center mt-2">
              브랜드
            </p>
          </div>
        </Link>
        <Link to="/brand">
          <div>
            <div className="">
              <img src="/lion.png" className="brand_img" alt="..." />
            </div>
            <p className="brand_name d-flex justify-content-center mt-2">
              브랜드
            </p>
          </div>
        </Link>
        <Link to="/brand">
          <div>
            <div className="">
              <img src="/lion.png" className="brand_img" alt="..." />
            </div>
            <p className="brand_name d-flex justify-content-center mt-2">
              브랜드
            </p>
          </div>
        </Link>
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default FamousBrand;
