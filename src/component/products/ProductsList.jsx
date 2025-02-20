import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

function ProductsList({ selectedCategory, products, user }) {
  let filteredProducts = [];

  if (!selectedCategory || selectedCategory === "전체") {
    filteredProducts = [...products].reverse();
  } else {
    filteredProducts = [...products]
      .filter((product) => product.category === selectedCategory)
      .reverse();
  }

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedItems, setLikedItems] = useState({});

  // 좋아요 불러오기
  useEffect(() => {
    if (user && user.user_id) {
      const storedLikes =
        JSON.parse(localStorage.getItem(`likeProducts_${user.user_id}`)) || [];
      setLikedItems(storedLikes);
    }
  }, [user]);

  // 변경될때마다 저장
  useEffect(() => {
    if (user && user.user_id) {
      localStorage.setItem(
        `likeProducts_${user.user_id}`,
        JSON.stringify(likedItems)
      );
    }
  }, [likedItems, user]);

  // 로컬에 좋아요 저장
  const toggleLike = (id) => {
    setLikedItems((prev) => {
      const updatedLikes = { ...prev };
      if (updatedLikes[id]) {
        delete updatedLikes[id]; // 찜 해제
      } else {
        updatedLikes[id] = true; // 찜 추가
      }

      localStorage.setItem(
        `likeProducts_${user.user_id}`,
        JSON.stringify(updatedLikes)
      );

      return updatedLikes;
    });
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="container">
      <main className="flex-grow-1 p-4">
        <h2 className="text-center mb-3 mt-3">상품</h2>
        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select w-auto"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[12, 24, 36].map((num) => (
              <option key={num} value={num}>
                {num}개씩 보기
              </option>
            ))}
          </select>
        </div>

        {products.length === 0 ? (
          <p className="text-center">검색 결과가 없습니다.</p>
        ) : (
          <div className="product-container">
            {currentProducts.map((product, index) => (
              <div key={index} className="card">
                <Link to={`/product/${product.product_id}`}>
                  <div className="position-relative card-img">
                    <img
                      src={product.images?.[0]}
                      className="card-img-top"
                      alt="..."
                    />
                    {!user ? (
                      <div></div>
                    ) : (
                      <img
                        src={
                          likedItems[product.product_id]
                            ? "/colorHeart.png"
                            : "/heart.png"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          toggleLike(product.product_id);
                        }}
                        alt="찜"
                        className="heart"
                      />
                    )}
                  </div>
                  <div className="card-body">
                    <p className="card-title">{product.title}</p>
                    <p className="card-price mb-0">
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

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
