import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";
import Pagination from "./Pagination";
import api from "../../api/axiosInstance";

const Wishlist = ({ user, products }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = "http://localhost:8090";

  // 백엔드 API로부터 찜 목록을 불러와, product 객체들을 배열로 저장
  const fetchFavorites = async () => {
    try {
      const response = await api.get("/favorite");
      // response.data: Favorite 배열 (각 Favorite 객체에 product 필드가 포함됨)
      if (Array.isArray(response.data)) {
        const products = response.data
          .filter((fav) => fav.product) // product가 null이 아닌 항목만 필터링
          .map((fav) => fav.product);
        // 최신 찜이 맨 앞에 오도록 reverse 처리
        setLikedProducts(products.reverse());
      } else {
        console.log("응답 데이터 형식이 배열이 아닙니다:", response.data);
      }
    } catch (error) {
      console.error("찜 목록 불러오기 실패", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      console.log("user가 설정되지 않았습니다.");
    }
  }, [user]);

  // 찜 해제: 삭제 API 호출 후 찜 목록 재조회
  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/favorite/${productId}`);
      // 삭제 후 목록 재조회
      fetchFavorites();
    } catch (error) {
      console.error("찜 삭제 실패", error);
    }
  };

  const totalPages = Math.ceil(likedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = likedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="wishlist-container">
      <h2>찜한 상품 목록</h2>
      <div className="wishlist-header">
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="12">12개씩 보기</option>
          <option value="24">24개씩 보기</option>
          <option value="36">36개씩 보기</option>
        </select>
      </div>

      {likedProducts.length === 0 ? (
        <p className="empty-message">찜한 상품이 없습니다.</p>
      ) : (
        <>
          <div className="wishlist-grid">
            {currentProducts.map((product) => (
              <div key={product.productId} className="wishlist-item">
                <Link to={`/product/${product.productId}`}>
                  <div className="wishlist-img">
                    {product.status === "판매중" ? (
                      <img
                        src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                        alt={product.title}
                      />
                    ) : (
                      <>
                        <img
                          src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                          className="card-img-top opacity-50"
                          alt={product.title}
                        />
                        <img
                          className="soldout-wish"
                          src="/soldout1.png"
                          alt="판매완료"
                        />
                      </>
                    )}
                  </div>
                  <div className="wishlist-info">
                    <p
                      className="wishlist-title"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordBreak: "break-word",
                      }}
                    >
                      {product.title}
                    </p>
                    <p
                      className="wishlist-price"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordBreak: "break-word",
                      }}
                    >
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                </Link>
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(product.productId)}
                >
                  찜 해제
                </button>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Wishlist;
