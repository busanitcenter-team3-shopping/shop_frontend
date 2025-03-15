import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ReviewRegister.css";

const ReviewRegister = () => {
  const navigate = useNavigate();
  const { purchaseId } = useParams();
  console.log("purchaseId from URL:", purchaseId);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // 로그인 정보 확인 후 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (!currentUser) {
      console.error("로그인 정보가 없습니다. 다시 로그인해 주세요.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState(null);

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
        user: { userId: currentUser.userId },
        purchase: { purchaseId: Number(purchaseId) },
      };

      // Blob을 통해 "review"라는 필드명으로 JSON 데이터 전송
      formData.append(
        "review",
        new Blob([JSON.stringify(review)], { type: "application/json" })
      );

      if (images && images.length > 0) {
        formData.append("image", images[0]);
      }

      const res = await fetch("http://172.30.1.71:8090/review/create", {
        method: "POST",
        body: formData, // multipart/form-data
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Server error: ${res.status} - ${errMsg}`);
      }

      const result = await res.json();
      console.log("등록 성공:", result);

      // 필요하다면 alert 등을 통해 사용자에게 알림
      alert("리뷰가 등록되었습니다.");
      navigate("/mypage");
    } catch (err) {
      console.error("등록 중 오류 발생:", err);
      alert("리뷰 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
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

            <div className="form-group mt-3">
              <label htmlFor="image">상품 이미지</label>
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
