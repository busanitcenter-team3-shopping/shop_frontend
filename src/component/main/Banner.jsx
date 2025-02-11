import React from "react";
import "./Banner.css";
import img1 from "../../assets/carousel1.jpg";
import img2 from "../../assets/carousel2.jpg";
import img3 from "../../assets/carousel3.jpg";
import img4 from "../../assets/carousel4.jpg";

function Banner() {
  return (
    <div>
      {/* 캐러셀 */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <a href="https://github.com/ch9729" target="_blank">
              <img src={img1} className="d-block w-100" alt="Slide 1" />
            </a>
          </div>
          <div className="carousel-item">
            <a href="https://github.com/nahee23" target="_blank">
              <img src={img2} className="d-block w-100" alt="Slide 2" />
            </a>
          </div>
          <div className="carousel-item">
            <a href="https://github.com/RayStarling0501" target="_blank">
              <img src={img3} className="d-block w-100" alt="Slide 3" />
            </a>
          </div>
          <div className="carousel-item">
            <a href="https://github.com/MrEom" target="_blank">
              <img src={img4} className="d-block w-100" alt="Slide 4" />
            </a>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default Banner;
