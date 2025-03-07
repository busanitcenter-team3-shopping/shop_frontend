import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import api from "../../api/axiosInstance";

const categoryMap = {
  ALL: "전체",
  CLOTHING: "의류",
  IT: "IT",
  STATIONERY: "문구",
  INSTRUMENT: "악기",
};

function ProductsList({ selectedCategory, products, user }) {
  let filteredProducts = [];

  if (!selectedCategory || selectedCategory === "ALL") {
    filteredProducts = [...products].reverse();
  } else {
    filteredProducts = [...products]
      .filter(
        (product) =>
          product.category.name ===
          (categoryMap[selectedCategory] || selectedCategory)
      )
      .reverse();
  }

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedItems, setLikedItems] = useState({});

  // 좋아요 불러오기
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorite");

        const favoritesObj = {};
        if (Array.isArray(response.data)) {
          response.data.forEach((fav) => {
            const prodId = fav.product?.productId || fav.product?.product_id;
            if (prodId) {
              favoritesObj[prodId] = true;
            }
          });
        } else {
          console.log("응답 데이터 형식이 배열이 아닙니다:", response.data);
        }
        setLikedItems(favoritesObj);
      } catch (error) {
        console.error("찜 목록 불러오기 실패", error);
      }
    };

    if (user) {
      fetchFavorites();
    } else {
      console.log("user가 설정되지 않았습니다.");
    }
  }, [user]);

  const toggleLike = async (id) => {
    try {
      if (likedItems[id]) {
        // 찜 해제
        await api.delete(`/favorite/${id}`);
        setLikedItems((prev) => {
          const newLikes = { ...prev };
          delete newLikes[id];
          return newLikes;
        });
      } else {
        // 찜 추가
        await api.post("/favorite", { productId: id });
        setLikedItems((prev) => ({ ...prev, [id]: true }));
      }
    } catch (error) {
      console.error("찜 처리 실패", error);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const BASE_URL = "http://localhost:8090";

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
                <Link to={`/product/${product.productId}`}>
                  <div className="position-relative card-img">
                    {product.status === "판매중" ? (
                      <>
                        <img
                          src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                          className="card-img-top"
                          alt={product.description}
                        />
                        {user && product.user !== null && (
                          <img
                            src={
                              likedItems[product.productId]
                                ? "/colorHeart.png"
                                : "/heart.png"
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLike(product.productId);
                            }}
                            alt="찜"
                            className="heart"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <img
                          src={product.images?.[0]}
                          className="card-img-top opacity-50"
                          alt={product.title}
                        />
                        <img
                          className="soldout-list"
                          src="/soldout1.png"
                          alt="판매완료"
                        />
                      </>
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
