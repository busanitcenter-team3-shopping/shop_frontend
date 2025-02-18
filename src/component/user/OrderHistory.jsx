import React from "react";
import "./OrderHistory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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

const OrderHistory = () => {
  return (
    <div className="container">
      <div className="order-history-container">
        <h2>최근 주문 내역</h2>

        <div className="order-list mt-5">
          {orders.map((order) => (
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
      </div>
    </div>
  );
};

export default OrderHistory;
