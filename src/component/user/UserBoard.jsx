import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

const UserBoard = ({ user, products }) => {
  const { user_id } = useParams();
  const [users, setUsers] = useState([]);

  const userProducts = products
    .filter((product) => String(product.user_id) === user_id)
    .slice(0, 4);
  console.log(userProducts);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const foundUser = storedUsers.find((u) => String(u.user_id) === user_id);
    console.log(foundUser);
    setUsers(foundUser);
  }, [user_id]);

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

  const recentReviews = reviews.slice(0, 2);

  return (
    <div className="container container1">
      <div className="profile-section d-flex flex-column justify-content-center">
        <div>
          <img src="/basicUser.png" className="profile-img" />
        </div>
        <div className="d-flex flex-column align-items-center">
          <h3 className="profile-name">{users.name}</h3>
          <p className="email-text">{users.email}</p>
        </div>
      </div>

      <hr />

      <div className="section-header">
        <h2 className="fw-bold">상품목록</h2>
        <Link
          to={`/user-page/${users.user_id}`}
          className="btn btn-link btn-about"
        >
          더보기 &gt;
        </Link>
      </div>

      {userProducts.length === 0 && (
        <p className="text-center mt-4">등록된 상품이 없습니다.</p>
      )}

      {/* 상품 그리드 */}
      <div className="product-container row1">
        {userProducts.map((product, index) => (
          <div key={index} className="card">
            <Link to={`/product/${product.product_id}`}>
              <div className="position-relative card-img">
                {product.status === "판매중" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <img
                      src={product.images?.[0]}
                      className="card-img-top opacity-50"
                      alt={product.title}
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
