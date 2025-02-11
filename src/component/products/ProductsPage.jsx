import React, { useState } from "react";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("IT");
  return (
    <div className="container d-flex">
      {/* 사이드바 (카테고리 선택) */}
      <ProductsSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 상품 리스트 */}
      <ProductsList />
    </div>
  );
};

export default ProductsPage;
