import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ReviewRegister.css";

const ReviewRegister = () => {
  const navigate = useNavigate();
  const { purchaseId } = useParams();
  console.log("purchaseId from URL:", purchaseId);

  // localStorage에서 "currentUser" 키로 로그인 정보를 가져옵니다.
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!currentUser) {
      console.error("로그인 정보가 없습니다. 다시 로그인해 주세요.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error("로그인 정보가 없습니다. 다시 로그인해 주세요.");
      return;
    }
    try {
      const formData = new FormData();
      const review = {
        title: title,
        content: description,
        // localStorage에 저장된 currentUser에서 userId 사용
        user: { userId: currentUser.userId },
        purchase: { purchaseId: Number(purchaseId) },
      };
      formData.append(
        "review",
        new Blob([JSON.stringify(review)], { type: "application/json" })
      );

      if (images && images.length > 0) {
        formData.append("image", images[0]);
      }

      const res = await fetch("http://localhost:8090/review/create", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const result = await res.json();
      console.log("등록 성공:", result);
      navigate("/mypage");
    } catch (err) {
      console.error("등록 중 오류 발생:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">리뷰 등록</h3>
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
              <label htmlFor="description">리뷰 내용</label>
              <textarea
                id="description"
                placeholder="리뷰를 입력해주세요"
                className="form-control"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* 일단 3개라고 표시는 했는데 확인 필요합니다 */}
            <div className="form-group mt-3">
              <label htmlFor="image">상품 이미지 (최대 3개)</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="form-control-file"
                multiple
                onChange={(e) => setImages(e.target.files)}
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

export default ReviewRegister;
