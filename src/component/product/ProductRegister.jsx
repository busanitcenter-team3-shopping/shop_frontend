import React, { useState } from "react";
import "./productRegister.css";
import { useLocation, useNavigate } from "react-router-dom";

const ProductRegister = ({ addProduct }) => {
  const location = useLocation();
  const user_id = location.state?.user_id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const maxImg = 3;

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > maxImg) {
      alert("3개의 이미지까지 업로드 가능합니다.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 상품 추가
    const newProduct = {
      user_id,
      title,
      price,
      description,
      category,
      status: "판매중",
      images: images.map((image) => URL.createObjectURL(image)),
    };

    // 원래 있던 상품
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // 상품 추가
    const updateProducts = [...existingProducts, newProduct];

    // 로컬에 일단 저장
    localStorage.setItem("products", JSON.stringify(updateProducts));

    alert("상품 등록이 완료되었습니다.");

    addProduct(newProduct);
    navigate("/");
    console.log(newProduct);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">상품 등록</h3>

      <div className="d-flex justify-content-center">
        <div className="product-card shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">상품 제목</label>
              <input
                type="text"
                placeholder="상품 이름을 입력해주세요"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setCategory(e.target.value)}
                className="select-box"
                required
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="IT">IT</option>
                <option value="의류">의류</option>
                <option value="문구">문구</option>
                <option value="악기">악기</option>
              </select>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="image">상품 이미지 (최대 3개)</label>
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
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
