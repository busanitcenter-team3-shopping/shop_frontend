import React, { useState } from "react";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";
import { useLocation } from "react-router-dom";

const ProductsPage = ({ products, user }) => {
  const location = useLocation();

  // 전체를 기본값으로로
  const initialCategory = location.state?.selectedCategory || "전체";

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
