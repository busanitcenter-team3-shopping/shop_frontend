import React, { useState, useEffect } from "react";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";
import { useLocation, useNavigate } from "react-router-dom";

const ProductsPage = ({ products, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const initialCategory = params.get("category") || "전체"; // 카테고리 가져오기
  const initialSearch = params.get("search") || ""; // 검색어 가져오기

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    setSearchQuery(initialSearch);
    setSelectedCategory(initialCategory);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/products?category=${encodeURIComponent(
        selectedCategory
      )}&search=${encodeURIComponent(searchQuery)}`
    );
  };

  // 검색 및 카테고리에 맞는 상품 필터링
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "전체" || product.category === selectedCategory)
  );

  return (
    <div className="container d-flex">
      {/* 사이드바 */}
      <ProductsSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          navigate(
            `/products?category=${encodeURIComponent(
              category
            )}&search=${encodeURIComponent(searchQuery)}`
          );
        }}
      />

      {/* 필터링된 상품 리스트 */}
      <ProductsList
        selectedCategory={selectedCategory}
        products={filteredProducts}
        user={user}
      />
    </div>
  );
};

export default ProductsPage;
