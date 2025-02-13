import React, { useState } from "react";
import "./productRegister.css";
import { useLocation } from "react-router-dom";

const ProductRegister = () => {
  const location = useLocation();
  const user_id = location.state?.user_id;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">상품 등록</h3>

      <div className="d-flex justify-content-center">
        <div className="product-card shadow-sm">
          <form>
            <div className="form-group">
              <label htmlFor="title">상품 제목</label>
              <input
                type="text"
                placeholder="상품 이름을 입력해주세요"
                className="form-control"
                value={title}
                id="title"
                name="title"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="price">상품 가격</label>
              <input
                type="number"
                min="1000"
                placeholder="최소금액이 1000원 입니다."
                className="form-control"
                id="price"
                value={price}
                name="price"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="description">상품 설명</label>
              <textarea
                id="description"
                placeholder="상품 내용을 입력해주세요"
                className="form-control"
                rows="4"
                value={description}
                name="description"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="category">카테고리</label>
              <select
                name="category"
                id="category"
                value={category}
                className="select-box"
                required
              >
                <option value="가전제품">가전제품</option>
                <option value="음식">음식</option>
                <option value="여자친구">여자친구</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="image">상품 이미지 (최대 3개)</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="form-control-file"
                multiple
                required
              />
            </div>

            <div className="d-flex justify-content-around mt-4">
              <button className="btn btn-outline-success" type="submit">
                등록하기
              </button>
              <button className="btn btn-outline-danger" type="reset">
                취소하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductRegister;
