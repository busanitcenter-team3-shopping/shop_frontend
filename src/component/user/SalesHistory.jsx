import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderHistory.css";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useMyContext } from "../../api/ContextApi";

const BASE_URL = "http://172.30.1.71:8090";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const { currentUser } = useMyContext();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        // 판매자 전용 API 엔드포인트 호출 (판매자 기준 판매 내역)
        const response = await api.get(
          `/purchase/seller/${currentUser.userId}`
        );
        setSales(response.data);
      } catch (error) {
        console.error("판매 내역 불러오기 실패:", error);
      }
    };

    if (currentUser) {
      fetchSales();
    }
  }, [currentUser]);

  return (
    <div className="container">
      <div className="order-history-container">
        <h2>최근 판매 내역</h2>
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
                  {!sale.sellerAlreadyReviewed && (
                    <Link to={`/add-review/seller/${sale.purchaseId}`}>
                      <button className="review-button">리뷰쓰기</button>
                    </Link>
                  )}
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
