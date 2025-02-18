import React from "react";
import "./ReviewPage.css";

const ReviewPage = () => {
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
  return (
    <div className="container">
      <div className="review-container">
        <h2>리뷰</h2>

        <div className="review-list mt-5">
          {reviews.map((review) => (
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

export default ReviewPage;
