import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useMyContext } from "../../api/ContextApi";

const reviews = [
  {
    id: 1,
    image: "/car.jpg",
    content: "친절해요",
    user_name: "나희",
  },
  {
    id: 2,
    image: "/car.jpg",
    content: "거래시간을 잘지켜요",
    user_name: "둘리",
  },
  {
    id: 3,
    image: null,
    content: "답변이 빨라요",
    user_name: "둘리",
  },
];

const UserBoard = ({ user }) => {
  const { user_id } = useParams();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const latestProducts = [...products].reverse().slice(0, 4);

  useEffect(() => {
    api
      .get(`/product/user-page/${user_id}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("상품 로드 실패:", error));
  }, []);

  useEffect(() => {
    api
      .get(`/user/${user_id}`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("유저 로드 실패:", error));
  }, []);

  console.log(products);
  console.log(users);

  const BASE_URL = "http://localhost:8090";

  // const userProducts = products
  //   .filter((product) => String(product.user_id) === user_id)
  //   .slice(0, 4);
  // console.log(userProducts);

  // useEffect(() => {
  //   const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  //   setUsers(storedUsers);

  //   const foundUser = storedUsers.find((u) => String(u.user_id) === user_id);
  //   console.log(foundUser);
  //   setUsers(foundUser);
  // }, [user_id]);

  const [likedItems, setLikedItems] = useState({});

  // 좋아요 불러오기
  // 백엔드 API를 통해 현재 로그인한 사용자의 찜 목록을 불러와 likedItems에 저장
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorite");
        const favoritesObj = {};
        if (Array.isArray(response.data)) {
          response.data.forEach((fav, index) => {
            // product id가 product_id 또는 productId 중 하나인지 확인
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
        // 찜 해제: DELETE /favorite/{productId}
        await api.delete(`/favorite/${id}`);
        setLikedItems((prev) => {
          const newLikes = { ...prev };
          delete newLikes[id];
          return newLikes;
        });
      } else {
        // 찜 추가: POST /favorite, { productId }
        await api.post("/favorite", { productId: id });
        setLikedItems((prev) => ({ ...prev, [id]: true }));
      }
    } catch (error) {
      console.error("찜 처리 실패", error);
    }
  };

  const recentReviews = reviews.slice(0, 2);

  return (
    <div className="container container1">
      <div className="profile-section d-flex flex-column justify-content-center">
        <div>
          <img src="/basicUser.png" className="profile-img" />
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
                        className="card-img-top"
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
          <h2 className="fw-bold">리 뷰</h2>
          <Link to="/review">더보기 &gt;</Link>
        </div>

        <div className="review-list mt-5">
          {recentReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-info">
                <div className="review-details">
                  <div className="status-container">
                    <p className="review-name mt-3">{review.content}</p>
                  </div>
                  <p className="review-price">작성자 : {review.user_name}</p>
                </div>
              </div>
              {review.image && (
                <img src={review.image} alt="" className="review-image" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBoard;
