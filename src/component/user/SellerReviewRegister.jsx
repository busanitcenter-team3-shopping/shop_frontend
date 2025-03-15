import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ReviewRegister.css";

const SellerReviewRegister = () => {
  const navigate = useNavigate();
  const { purchaseId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 판매자 리뷰는 이미지 없이 텍스트 정보만 전송
      const review = {
        title: title,
        content: content,
        user: { userId: currentUser.userId },
        purchase: { purchaseId: Number(purchaseId) },
      };

      const response = await fetch("http://172.30.1.71:8090/review/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const result = await response.json();
      console.log("판매자 리뷰 등록 성공:", result);

      // 등록 성공 후 마이페이지로 이동
      navigate("/mypage");
    } catch (err) {
      console.error("판매자 리뷰 등록 오류:", err);
      // 에러 처리 시 필요한 로직(알림 등)을 추가할 수 있습니다.
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">판매자 리뷰 등록</h3>
      <div className="d-flex justify-content-center">
        <div className="add-review-card shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <label htmlFor="title">리뷰 제목</label>
              <input
                id="title"
                type="text"
                placeholder="리뷰 제목을 입력해주세요"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="content">리뷰 내용</label>
              <textarea
                id="content"
                placeholder="리뷰 내용을 입력해주세요"
                className="form-control"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-center mt-4 gap-5">
              <button className="btn btn-outline-success" type="submit">
                등록하기
              </button>
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={() => navigate("/mypage")}
              >
                취소하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerReviewRegister;
