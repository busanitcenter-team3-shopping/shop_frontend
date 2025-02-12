import React from "react";
import "./productRegister.css";

const ProductRegister = () => {
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
                name="price"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="stock">상품 재고</label>
              <input
                type="number"
                placeholder="최소 1개 이상 입력해주세요."
                min="1"
                className="form-control"
                id="stock"
                name="stock"
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
                name="description"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="image">상품 이미지</label>
              <input
                id="image"
                type="file"
                accept="image/*" //이미지만 업로드 되도록 설정
                className="form-control-file"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="image">상품 이미지</label>
              <input
                id="image"
                type="file"
                accept="image/*" //이미지만 업로드 되도록 설정
                className="form-control-file"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="image">상품 이미지</label>
              <input
                id="image"
                type="file"
                accept="image/*" //이미지만 업로드 되도록 설정
                className="form-control-file"
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
