import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useMyContext } from "../../api/ContextApi";

const UserBoard = ({ user }) => {
  const { user_id } = useParams();
  const [users, setUsers] = useState({});
  const [products, setProducts] = useState([]);
  // 실제 리뷰 데이터를 저장할 상태 변수
  const [fetchedReviews, setFetchedReviews] = useState([]);

  const latestProducts = [...products].reverse().slice(0, 4);

  useEffect(() => {
    api
      .get(`/product/user-page/${user_id}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("상품 로드 실패:", error));
  }, [user_id]);

  useEffect(() => {
    api
      .get(`/user/${user_id}`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("유저 로드 실패:", error));
  }, [user_id]);

  const BASE_URL = "http://localhost:8090";

  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorite");
        const favoritesObj = {};
        if (Array.isArray(response.data)) {
          response.data.forEach((fav, index) => {
            const prodId = fav.product?.product_id || fav.product?.productId;
            if (prodId) {
              favoritesObj[prodId] = true;
              console.log(`찜 항목 ${index}:`, fav.product);
            }
          });
        } else {
          console.log("응답 데이터 형식이 배열이 아닙니다:", response.data);
        }
        setLikedItems(favoritesObj);
        console.log("전체 찜 목록:", favoritesObj);
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
        await api.delete(`/favorite/${id}`);
        setLikedItems((prev) => {
          const newLikes = { ...prev };
          delete newLikes[id];
          return newLikes;
        });
      } else {
        await api.post("/favorite", { productId: id });
        setLikedItems((prev) => ({ ...prev, [id]: true }));
      }
    } catch (error) {
      console.error("찜 처리 실패", error);
    }
  };

  // 실제 리뷰 데이터 fetch (받은 리뷰만 조회)
  useEffect(() => {
    api
      .get(`/review/for/${user_id}`)
      .then((response) => {
        console.log("서버 응답 리뷰:", response.data);
        setFetchedReviews(response.data);
      })
      .catch((error) => console.error("리뷰 로드 실패:", error));
  }, [user_id]);

  return (
    <div className="container container1">
      <div className="profile-section d-flex flex-column justify-content-center">
        <div>
          <img src="/basicUser.png" className="profile-img" alt="프로필" />
        </div>
        <div className="d-flex flex-column align-items-center">
          <h3 className="profile-name">{users.username}</h3>
          <p className="email-text">{users.email}</p>
        </div>
      </div>

      <hr />

      <div className="section-header">
        <h2 className="fw-bold">상품목록</h2>
        <Link
          to={`/user-page/${users.userId}`}
          className="btn btn-link btn-about"
        >
          더보기 &gt;
        </Link>
      </div>

      {latestProducts.length === 0 && (
        <p className="text-center mt-4">등록된 상품이 없습니다.</p>
      )}

      {/* 상품 그리드 */}
      <div className="product-container row row1">
        {latestProducts.map((product, index) => (
          <div key={index}>
            <Link to={`/product/${product.productId}`}>
              <div className="card">
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
                        src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                        className="card-img-top opacity-50"
                        alt={product.description}
                      />
                      <img
                        className="soldout-user"
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
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="review-container">
        <div className="section-header">
          <h2 className="fw-bold">리뷰</h2>
          <Link to={`/review/${user_id}`}>더보기 &gt;</Link>
        </div>
        {fetchedReviews.length === 0 ? (
          <p className="text-center mt-3">리뷰가 없습니다.</p>
        ) : (
          <div className="review-list mt-5">
            {fetchedReviews.slice(0, 2).map((review, idx) => (
              <div
                key={`${review.productId}_${review.reviewerId}_${idx}`}
                className="review-card"
              >
                <div className="review-info">
                  <div className="review-details">
                    <div className="status-container">
                      <p className="review-name mt-3">{review.reviewTitle}</p>
                    </div>
                    <p className="review-price">
                      작성자 : {review.reviewerName}
                    </p>
                    <p className="review-content">{review.reviewContent}</p>
                  </div>
                </div>
                {review.image ? (
                  <img
                    src={review.image}
                    alt="리뷰 이미지"
                    className="review-image"
                  />
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBoard;
