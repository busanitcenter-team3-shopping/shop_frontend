import React, { useState } from "react";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";
import { useLocation } from "react-router-dom";

const ProductsPage = ({ products, user }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("category") || "전체"; // ✅ 쿼리에서 카테고리 가져오기

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  return (
    <div className="container d-flex">
      {/* 사이드바 (카테고리 선택) */}
      <ProductsSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 상품 리스트 */}
      <ProductsList
        selectedCategory={selectedCategory}
        products={products}
        user={user}
      />
    </div>
  );
};

export default ProductsPage;
