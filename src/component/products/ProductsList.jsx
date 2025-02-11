import React, { useState } from "react";
import img1 from "../../assets/carousel1.jpg";
import "./ProductsList.css";
import { Link } from "react-router-dom";

const products = Array(12).fill({
  name: "상품명 (camera)",
  brand: "브랜드",
  price: 25000,
  image: { img1 }, // 더미 이미지
});

function ProductsList() {
  const [like, setLike] = useState(Array(12).fill(false));
  const toggleHeart = (index) => {
    setLike((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="flex-grow-1 p-4">
      <h2 className="text-center mb-3 mt-3">상품</h2>
      {/* 페이지당 아이템 개수 선택 */}
      <div className="d-flex justify-content-end mb-3">
        <select
          className="form-select w-auto"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
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
        {products.map((product, index) => (
          <div key={index} className="col-md-3 mb-4">
            <Link to="/product">
              <div className="card">
                <div className="position-relative card-img">
                  <img src="/lion.png" className="card-img-top" alt="..." />
                  <img
                    src={like[index] ? "/colorHeart.png" : "/heart.png"}
                    style={{ width: "30px", height: "30px" }}
                    className="position-absolute bottom-0 end-0 p-1 heart"
                    alt="heart"
                    onClick={(e) => {
                      e.preventDefault(); // a 태그의 기본 동작 방지
                      toggleHeart(index);
                    }}
                  />
                </div>
                <div className="card-body">
                  <p className="card-title">{product.brand}</p>
                  <p className="card-text mb-0">{product.name}</p>
                  <p className="card-price mb-0">가격 : {product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link">&lt;</button>
            </li>
            {[1, 2, 3, 4, 5].map((num) => (
              <li
                key={num}
                className={`page-item ${num === currentPage ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link">&gt;</button>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}

export default ProductsList;
