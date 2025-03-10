import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";

const BASE_URL = "http://localhost:8090";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/purchase");
        setOrders(response.data);
      } catch (error) {
        console.error("주문 내역 불러오기 실패:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="order-history-container">
        <h2>최근 주문 내역</h2>
        <div className="order-list mt-5">
          {orders.length === 0 ? (
            <p>주문 내역이 없습니다.</p>
          ) : (
            orders.map((order) => {
              // order 객체 내에 product 정보가 포함되어 있다고 가정
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
                  <Link to="/add-review">
                    <button className="review-button">리뷰쓰기</button>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
