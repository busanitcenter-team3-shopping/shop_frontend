import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myPage.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useMyContext } from "../../api/ContextApi";

const Mypage = ({ user, setUser, products }) => {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { token, setToken, currentUser, setCurrentUser } = useMyContext();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("USER")); // 현재 로그인된 유저의 정보

    if (storedUser) {
      setUser(storedUser);
    }
    console.log(currentUser.userId);
  }, [setUser, products]);

  // 회원 삭제
  const handleDelete = async () => {
    const isConfirmed = confirm("정말로 탈퇴 하시겠습니까?");
    if (!isConfirmed) return;

    try {
      // 로그인된 사용자
      if (!user) {
        alert("사용자 정보가 없습니다.");
        return;
      }
      const response = await api.delete(`/user/delete/${currentUser?.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        alert("탈퇴가 완료되었습니다.");

        localStorage.removeItem("USER");
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem("currentUser");

        setUser(null);
        setToken(null);
        setCurrentUser(null);

        navigate("/");
      }
    } catch (error) {
      console.error("에러 발생: " + error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await api.get("/favorite");

      if (Array.isArray(response.data)) {
        const productsFromFavorites = response.data
          .filter((fav) => fav.product) // product가 존재하는 항목만
          .map((fav) => fav.product);
        // 최신 찜이 먼저 보이도록 reverse 처리 후, 최대 4개만 저장
        setLikedProducts(productsFromFavorites.reverse().slice(0, 4));
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

  const fetchOrders = async () => {
    try {
      const response = await api.get("/purchase");
      setOrders(response.data);
    } catch (error) {
      console.error("주문 내역 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const recentOrders = orders.slice(0, 2);

  const BASE_URL = "http://localhost:8090";

  return (
    <div className="container container1 mt-5">
      <div className="row align-items-center">
        <div
          md={3}
          className="sidebar d-flex flex-column justify-content-center"
        >
          <div className="sidebar-section">
            <h5>
              <strong>나의 쇼핑정보</strong>
            </h5>
            <Link to="/orderhistory">
              <p>주문내역</p>
            </Link>
            <Link to="/wishlist">
              <p>찜 리스트</p>
            </Link>
          </div>
          <hr />
          <div className="sidebar-section">
            <h5>
              <strong>나의 판매정보</strong>
            </h5>
            <Link to={`/user-page/${currentUser?.userId}`}>
              <p>판매물품</p>
            </Link>
            <Link to="/review">
              <p>리뷰</p>
            </Link>
          </div>
          <hr />
          <div className="sidebar-section">
            <h5>
              <strong>나의 정보</strong>
            </h5>
            <Link to="/edit-user" state={{ user }}>
              <p>회원정보 수정</p>
            </Link>
            <button onClick={handleDelete}>회원 탈퇴</button>
          </div>
        </div>

        <div md={9} className="main-content col">
          <div className="profile-section d-flex flex-column justify-content-center">
            <div>
              <img src="/basicUser.png" className="profile-img" />
            </div>
            <div className="d-flex flex-column align-items-center">
              <h3 className="profile-name">{currentUser?.username}</h3>
              <p className="email-text">{currentUser?.email}</p>
            </div>
          </div>

          <hr />

          <div className="section-header">
            <h2 className="fw-bold">최근 주문 내역</h2>
            <Link to="/orderhistory">더보기 &gt;</Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-center mt-4">주문 내역이 없습니다.</p>
          ) : (
            <div className="d-flex justify-content-around mb-5">
              {recentOrders.map((order) => {
                const product = order.product;
                return (
                  <div key={order.purchaseId} className="order-card">
                    <div className="order-info">
                      <img
                        src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                        alt={product.title}
                        className="order-image"
                      />
                      <div className="order-details">
                        <div className="status-container">
                          <p className="order-name mt-3">{product.title}</p>
                        </div>
                        <p className="order-price">
                          가격 : {product.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                    {order.alreadyReviewed ? (
                      <button className="review-button" disabled>
                        작성 완료
                      </button>
                    ) : (
                      <Link to={`/add-review/${order.purchaseId}`}>
                        <button className="review-button">리뷰쓰기</button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="section-header mt-4 mb-5">
            <h2 className="fw-bold">찜 리스트</h2>
            <Link to="/wishlist">더보기 &gt;</Link>
          </div>
          {likedProducts.length === 0 ? (
            <p className="text-center fw-bold mt-3">찜한 상품이 없습니다.</p>
          ) : (
            <div className="product-container row row1">
              {likedProducts.map((product) => (
                <div key={product.productId}>
                  <Link to={`/product/${product.productId}`}>
                    <div className="card">
                      <div className="position-relative card-img">
                        {product.status === "판매중" ? (
                          <img
                            src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                            className="card-img-top"
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
                              className="soldout-my"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
