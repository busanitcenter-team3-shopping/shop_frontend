import React, { useState } from "react";
import "./ProductsList.css";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

function ProductsList({ selectedCategory, products }) {
  let filteredProducts = [];

  if (!selectedCategory || selectedCategory === "전체") {
    // 카테고리가 없거나 전체이면 전체 상품 출력
    filteredProducts = [...products].reverse();
  } else {
    filteredProducts = [...products]
      .filter((product) => product.category === selectedCategory)
      .reverse();
  }

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 맞는 상품 필터링
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="container">
      <main className="flex-grow-1 p-4">
        <h2 className="text-center mb-3 mt-3">상품</h2>
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
              <Link to={`/product/${product.product_id}`}>
                <div className="card">
                  <div className="position-relative card-img">
                    <img
                      src={product.images?.[0]}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-title">{product.title}</p>
                    <p className="card-price mb-0">가격 : {product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* 페이지네이션 적용 */}
        <Pagination
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}

export default ProductsList;
