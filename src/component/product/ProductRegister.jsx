import React, { useState } from "react";
import "./productRegister.css";
import { useLocation, useNavigate } from "react-router-dom";

const ProductRegister = ({ addProduct }) => {
  const location = useLocation();
  const user_id = location.state?.user_id; // 유저의 id 값을 받아와 어떠한 유저가 상품을 등록했는지 저장하기 위해
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const maxImg = 3;

  // 새로 고침을 하고 나면 URL은 사라지므로 등록을 하고 새로고침을 하면 이미지가 꺠진 상태로 보인다.
  // 방지 차원으로 일단 Base64로 저장 상태
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > maxImg) {
      alert("3개의 이미지까지 업로드 가능합니다.");
      return;
    }

    const base64Images = await Promise.all(
      selectedFiles.map((file) => convertToBase64(file))
    );

    setImages((prevImages) => [...base64Images, ...prevImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 원래 있던 상품
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const newProductId =
      existingProducts.length > 0
        ? Math.max(...existingProducts.map((p) => p.product_id)) + 1
        : 1;
    // 상품 추가
    const newProduct = {
      product_id: newProductId, // 상품 고유값
      user_id,
      seller_id: user_id,
      title,
      price,
      description,
      category,
      status: "판매중",
      images,
    };

    // 상품 추가
    const updateProducts = [newProduct, ...existingProducts];

    // 로컬에 일단 저장
    localStorage.setItem("products", JSON.stringify(updateProducts));

    alert("상품 등록이 완료되었습니다.");

    addProduct(newProduct);
    console.log(updateProducts);
    navigate("/");
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
                onChange={(e) => setPrice(Number(e.target.value))}
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

export default ProductRegister;
