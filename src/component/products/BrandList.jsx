import React, { useState } from "react";
import img1 from "../../assets/carousel1.jpg";
import "./ProductsList.css";

const products = Array(12).fill({
  name: "상품명 (camera)",
  brand: "브랜드",
  price: 25000,
  image: { img1 }, // 더미 이미지
});

function BrandList() {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container">
      <main className="flex-grow-1 p-4">
        <h2 className="text-center mb-3 mt-3">브랜드</h2>
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
            <div
              key={index}
              className="col-md-3 col-sm-4 col-6 mb-4 text-center"
            >
              <a href="#">
                <img
                  src="/lion.png"
                  className="img-fluid rounded border border-dark"
                  style={{ maxWidth: "200px", marginBottom: "10px" }}
                  alt="..."
                />
                <h6 className="fw-bold">{product.brand}</h6>
              </a>
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
    </div>
  );
}

export default BrandList;
