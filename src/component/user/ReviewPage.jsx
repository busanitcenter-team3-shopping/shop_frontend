import React, { useEffect, useState } from "react";
import "./ReviewPage.css";
import api from "../../api/axiosInstance";
import { useMyContext } from "../../api/ContextApi";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useMyContext();
  const [users, setUsers] = useState({});

  useEffect(() => {
    api
      .get(`/user/${userId}`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("유저 로드 실패:", error));
  }, [userId]);

  console.log(userId);

  useEffect(() => {
    // currentUser가 있어야만 리뷰를 불러옴
    if (!currentUser) return;

    const fetchReviews = async () => {
      try {
        // 예: 백엔드에서 userId가 받은 리뷰 조회 엔드포인트
        const response = await api.get(`/review/for/${userId}`);
        console.log("서버 응답 리뷰:", response.data);
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰 불러오기 실패:", error);
      }
    };

    fetchReviews();
  }, [currentUser]);

  return (
    <div className="container">
      <div className="review-container">
        <h2>리뷰</h2>
        <div className="review-list mt-5">
          {/* 리뷰가 없는 경우 */}
          {reviews.length === 0 ? (
            <p className="text-center fw-bold mt-3">리뷰가 없습니다.</p>
          ) : (
            reviews.map((review, index) => (
              <div
                key={`${review.productId}-${review.reviewerId}-${index}`}
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
                {review.image && (
                  <img
                    src={review.image}
                    alt="리뷰 이미지"
                    className="review-image"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
