import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

const Wishlist = ({ user, products }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user && user.user_id) {
      const storedLikes =
        JSON.parse(localStorage.getItem(`likeProducts_${user.user_id}`)) || {};
      const likedList = Object.keys(storedLikes)
        .map((productId) =>
          products.find((product) => String(product.product_id) === productId)
        )
        .filter(Boolean)
        .reverse();
      setLikedProducts(likedList);
    }
  }, [user, products]);

  const removeFromWishlist = (product_id) => {
    if (user && user.user_id) {
      const storedLikes =
        JSON.parse(localStorage.getItem(`likeProducts_${user.user_id}`)) || {};
      if (storedLikes[product_id]) {
        delete storedLikes[product_id];
        localStorage.setItem(
          `likeProducts_${user.user_id}`,
          JSON.stringify(storedLikes)
        );
      }
      setLikedProducts((prev) =>
        prev.filter(
          (product) => String(product.product_id) !== String(product_id)
        )
      );
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
      <h1>찜한 상품 목록</h1>
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
              <div key={product.product_id} className="wishlist-item">
                <Link to={`/product/${product.product_id}`}>
                  <div className="wishlist-img">
                    <img src={product.images?.[0]} alt={product.title} />
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
                  onClick={() => removeFromWishlist(product.product_id)}
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
