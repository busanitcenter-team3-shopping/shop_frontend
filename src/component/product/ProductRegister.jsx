import React, { useEffect, useState } from "react";
import "./productRegister.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

const ProductRegister = ({ addProduct, updateProduct }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const existingProduct = location.state?.product || null;
  const user_id = location.state?.user_id;

  // 상태 변수 설정
  const [title, setTitle] = useState(existingProduct?.title || "");
  const [price, setPrice] = useState(existingProduct?.price || "");
  const [description, setDescription] = useState(
    existingProduct?.description || ""
  );
  const [category, setCategory] = useState(existingProduct?.category || "");
  const [images, setImages] = useState(existingProduct?.images || []);
  const maxImg = 3;

  useEffect(() => {
    if (existingProduct) {
      setTitle(existingProduct.title);
      setPrice(existingProduct.price);
      setDescription(existingProduct.description);
      setCategory(existingProduct.category);
      setImages(existingProduct.images || []);
    }
  }, [existingProduct]);

  // 이미지 변경 핸들러 (새로운 이미지만 저장)
  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > maxImg) {
      alert(`이미지는 3개까지 등록가능합니다.`);
    } else {
      setImages(selectedFiles); // 기존 이미지 삭제후 이미지 추가
    }
  };

  // 상품 등록 및 수정 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (images.length > maxImg) {
    //   alert("최대 3개의 이미지만 등록할 수 있습니다.");
    //   //return;
    // } else {
    //   const existingProducts =
    //     JSON.parse(localStorage.getItem("products")) || [];

    //   if (existingProduct) {
    //     // 상품 수정
    //     const updatedProduct = {
    //       ...existingProduct,
    //       title,
    //       price,
    //       description,
    //       category,
    //       images, // 기존 이미지 삭제 후 새로운 이미지 저장
    //     };

    //     const updatedProducts = existingProducts.map((product) =>
    //       product.product_id === existingProduct.product_id
    //         ? updatedProduct
    //         : product
    //     );

    //     localStorage.setItem("products", JSON.stringify(updatedProducts));

    //     if (updateProduct) updateProduct(updatedProduct);
    //     alert("상품이 성공적으로 수정되었습니다.");
    //   } else {
    // 상품 등록

    const productData = {
      title,
      price,
      description,
      category,
    };

    const formData = new FormData();
    formData.append("product", JSON.stringify(productData)); // JSON 문자열로 변환

    const files = document.querySelector("#fileInput").files;
    for (let i = 0; i < maxImg; i++) {
      formData.append("files", files[i]); // 여러 개의 파일 추가
    }

    try {
      const response = await api.post("product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // JSON 대신 multipart/form-data 사용
        },
      });

      console.log("상품 등록 성공!", response.data);
    } catch (error) {
      console.error("상품 등록 실패", error.response?.data || error.message);
    }

    navigate("/");
  };
  // };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">
        {existingProduct ? "상품 수정" : "상품 등록"}
      </h3>

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
                id="fileInput"
                type="file"
                accept="image/*"
                className="form-control-file"
                onChange={handleImageChange}
                multiple
                required
              />
            </div>

            <div className="d-flex justify-content-around mt-4">
              <button className="btn btn-outline-success" type="submit">
                {existingProduct ? "수정하기" : "등록하기"}
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

export default ProductRegister;
