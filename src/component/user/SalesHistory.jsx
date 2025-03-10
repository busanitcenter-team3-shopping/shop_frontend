import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderHistory.css";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useMyContext } from "../../api/ContextApi";

const BASE_URL = "http://localhost:8090";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const { currentUser } = useMyContext();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        // 전체 구매 내역 불러오기 (/purchase/all)
        const response = await api.get("/purchase/all");
        console.log("전체 구매 내역 응답:", response.data);
        if (Array.isArray(response.data) && currentUser) {
          // 현재 판매자(= 현재 로그인한 사용자)가 등록한 상품만 필터링
          const filteredSales = response.data.filter((order, index) => {
            console.log(`구매 내역 ${index}:`, order);
            return (
              order.product &&
              order.product.user &&
              order.product.user.userId === currentUser.userId
            );
          });
          console.log("필터링된 판매 내역:", filteredSales);
          setSales(filteredSales);
        }
      } catch (error) {
        console.error("판매 내역 불러오기 실패:", error);
      }
    };

    if (currentUser) {
      console.log("현재 판매자 정보:", currentUser);
      fetchSales();
    } else {
      console.log("현재 판매자 정보가 없습니다.");
    }
  }, [currentUser]);

  return (
    <div className="container">
      <div className="order-history-container">
        <h2>판매 내역</h2>
        <div className="order-list mt-5">
          {sales.length === 0 ? (
            <p>판매한 상품이 없습니다.</p>
          ) : (
            sales.map((sale) => {
              const product = sale.product;
              return (
                <div key={sale.purchaseId} className="order-card">
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

export default SalesHistory;
