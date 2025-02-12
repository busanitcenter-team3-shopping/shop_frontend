import React, { useState } from "react";
import Pagination from "./Pagination";
import img1 from "../../assets/carousel1.jpg";
import { Link } from "react-router-dom";

const products = Array(50).fill({
  name: "상품명 (camera)",
  brand: "브랜드",
  price: 25000,
  image: img1, // 이미지 경로 수정
});

const BrandPage = () => {
  const [like, setLike] = useState(Array(50).fill(false));
  const toggleHeart = (index) => {
    setLike((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지의 상품 계산
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  return (
    <div className="container">
      <div md={9} className="main-content col mt-3">
        <div className="profile-section d-flex flex-column justify-content-center">
          <div>
            <img src="/basicUser.png" className="profile-img" />
          </div>
          <div className="d-flex flex-column align-items-center">
            <h2 className="profile-name">브 랜 드</h2>
          </div>
        </div>

        <hr />
      </div>
      {/* 페이지당 아이템 개수 선택 */}
      <div className="d-flex justify-content-end mb-3">
        <select
          className="form-select w-auto"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // 개수 변경 시 1페이지로 이동
          }}
        >
          {[12, 24, 36].map((num) => (
            <option key={num} value={num}>
              {num}개씩 보기
            </option>
          ))}
        </select>
      </div>

      {/* 상품 그리드 */}
      <div className="row">
        {currentProducts.map((product, index) => (
          <div key={index} className="col-md-3 mb-4">
            {/* <Link to="/product"> */}
            <div className="card">
              <div className="position-relative card-img">
                <img src="/lion.png" className="card-img-top" alt="..." />
                <img
                  src={
                    like[startIndex + index] ? "/colorHeart.png" : "/heart.png"
                  }
                  style={{ width: "30px", height: "30px" }}
                  className="position-absolute bottom-0 end-0 p-1 heart"
                  alt="heart"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleHeart(startIndex + index); // 전체 제품 배열의 인덱스 사용
                  }}
                />
              </div>
              <div className="card-body">
                <p className="card-title">{product.brand}</p>
                <p className="card-text mb-0">{product.name}</p>
                <p className="card-price mb-0">가격 : {product.price}</p>
              </div>
            </div>
            {/* </Link> */}
          </div>
        ))}
      </div>
      {/* 페이지네이션 적용 */}
      <Pagination
        totalItems={products.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BrandPage;
