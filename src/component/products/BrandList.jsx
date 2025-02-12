import React, { useState } from "react";
import img1 from "../../assets/carousel1.jpg";
import "./ProductsList.css";
import Pagination from "./Pagination";

const products = Array(50).fill({
  name: "상품명 (camera)",
  brand: "브랜드",
  price: 25000,
  image: img1, // 이미지 경로 수정
});

function BrandList() {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지의 상품 계산
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="container">
      <main className="flex-grow-1 p-4">
        <h2 className="text-center mb-3 mt-3">브랜드</h2>

        {/* 페이지당 아이템 개수 선택 */}
        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select w-auto"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // ~~개씩 보기 눌렀을때 1페이지로 전환하려고고
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
            <div
              key={index}
              className="col-md-3 col-sm-4 col-6 mb-4 text-center"
            >
              <a href="#">
                <img
                  src={product.image}
                  className="img-fluid rounded border border-dark"
                  style={{ maxWidth: "200px", marginBottom: "10px" }}
                  alt="상품 이미지"
                />
                <h6 className="fw-bold">{product.brand}</h6>
              </a>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <Pagination
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}

export default BrandList;
