import React from "react";
import "./OrderHistory.css"; // 스타일을 별도로 적용 (예: 배경색, 간격 등)

const orders = [
  {
    id: 1,
    image: "/lion.png", // 상품 이미지
    name: "상품명",
    price: 100000,
    status: "판매완료",
  },
  {
    id: 2,
    image: "/lion.png",
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

        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-info">
                <img
                  src={order.image}
                  alt={order.name}
                  className="order-image"
                />
                <div className="order-details">
                  <p className="order-name">{order.name}</p>
                  <p className="order-price">
                    가격 : {order.price.toLocaleString()}원
                  </p>
                </div>
              </div>
              <button className="review-button">리뷰쓰기</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
