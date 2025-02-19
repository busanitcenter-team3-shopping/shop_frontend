import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myPage.css";
import { Link, useNavigate } from "react-router-dom";

const orders = [
  {
    id: 1,
    image: "/car.jpg", // 상품 이미지
    name: "상품명",
    price: 100000,
    status: "판매중",
  },
  {
    id: 2,
    image: "/car.jpg",
    name: "상품명2",
    price: 100000,
    status: "판매완료",
  },
  {
    id: 3,
    image: "/car.jpg",
    name: "상품명2",
    price: 100000,
    status: "판매완료",
  },
  // 더 많은 주문을 추가할 수 있습니다.
];

const Mypage = ({ user, setUser, products }) => {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const updatedUser = JSON.parse(localStorage.getItem("loggedInUser")); // 현재 로그인된 유저의 정보
    if (updatedUser) {
      setUser(updatedUser);
    }

    if (updatedUser) {
      const storedLikes =
        JSON.parse(
          localStorage.getItem(`likeProducts_${updatedUser.user_id}`)
        ) || [];

      const likedProductList = Object.keys(storedLikes)
        .map((product_id) =>
          products.find((product) => String(product.product_id) === product_id)
        )
        .filter(Boolean)
        .reverse();

      setLikedProducts(likedProductList.slice(0, 4));
    }
  }, [setUser, products]);

  const handleDelete = () => {
    const isConfirmed = confirm("정말로 탈퇴 하시겠습니까?");

    if (!isConfirmed) {
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = existingUsers.filter(
      (existingUsers) => existingUsers.email !== user.email
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.removeItem("loggedInUser");
    setUser(null);

    alert("탈퇴가 완료되었습니다.");
    navigate("/");
  };

  const recentOrders = orders.slice(0, 2);

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
            <a href="#">
              <p>찜 리스트</p>
            </a>
          </div>
          <hr />
          <div className="sidebar-section">
            <h5>
              <strong>나의 판매정보</strong>
            </h5>
            <a href="#">
              <p>판매물품</p>
            </a>
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
              <h3 className="profile-name">{user?.name}</h3>
              <p className="email-text">{user?.email}</p>
            </div>
          </div>

          <hr />

          <div className="section-header">
            <h2 className="fw-bold">최근 주문 내역</h2>
            <Link to="/orderhistory">더보기 &gt;</Link>
          </div>
          <div className="d-flex justify-content-around mb-5">
            {recentOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-info">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="order-image"
                  />
                  <div className="order-details">
                    <div className="status-container">
                      <p className="order-name mt-3">{order.name}</p>
                    </div>
                    <p className="order-price">
                      가격 : {order.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
                <Link to="/add-review">
                  <button className="review-button">리뷰쓰기</button>
                </Link>
              </div>
            ))}
          </div>

          <div className="section-header mt-4 mb-5">
            <h2 className="fw-bold">찜 리스트</h2>
            <Link to="/wishlist">더보기 &gt;</Link>
          </div>
          <div className="product-container row1">
            {likedProducts.length > 0 ? (
              likedProducts.map((product) => (
                <div key={product.product_id} className="card">
                  <Link to={`/product/${product.product_id}`}>
                    <div className="position-relative card-img">
                      <img
                        src={product.images?.[0]}
                        className="card-img-top"
                        alt={product.title}
                      />
                    </div>
                    <div className="card-body">
                      <p className="card-title">{product.title}</p>
                      <p className="card-price mb-0">
                        {product.price.toLocaleString()}원
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center fw-bold mt-3">찜한 상품이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
