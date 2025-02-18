import React from "react";
import "./ReviewRegister.css";
import { useNavigate } from "react-router-dom";

const ReviewRegister = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">리뷰 등록</h3>

      <div className="d-flex justify-content-center">
        <div className="add-review-card shadow-sm">
          <form>
            <div className="form-group mt-3">
              <label htmlFor="description">리뷰 내용</label>
              <textarea
                id="description"
                placeholder="리뷰를 입력해주세요"
                className="form-control"
                rows="4"
                // value={description}
                // onChange={(e) => setDescription(e.target.value)}
                name="description"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="image">상품 이미지 (최대 3개)</label>
              <input
                id="image"
                type="file"
                // onChange={handleImageChange}
                accept="image/*"
                className="form-control-file"
                multiple
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
                onClick={() => {
                  navigate("/mypage");
                }}
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
