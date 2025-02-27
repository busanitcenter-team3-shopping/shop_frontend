import React, { useState, useEffect } from "react";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

const categoryMap = {
  ALL: "전체",
  CLOTHING: "의류",
  IT: "IT",
  STATIONERY: "문구",
  INSTRUMENT: "악기",
};

const ProductsPage = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const initialCategory = params.get("category") || "ALL"; // 카테고리 가져오기
  const initialSearch = params.get("search") || ""; // 검색어 가져오기

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category") || "ALL"; // 카테고리
    const searchQuery = params.get("search") || "";
    setSelectedCategory(categoryMap[categoryParam] || categoryParam);
    setSearchQuery(searchQuery);

    api
      .get(
        `/product?category=${
          categoryParam === "ALL" ? "" : encodeURIComponent(categoryParam)
        }&search=${encodeURIComponent(searchQuery)}`
      )
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("상품 로드 실패:", error));
  }, [location.search]);

  //console.log(products);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/product?category=${encodeURIComponent(
        selectedCategory
      )}&search=${encodeURIComponent(searchQuery)}`
    );
  };

  // // 검색 및 카테고리에 맞는 상품 필터링
  // const filteredProducts = products.filter(
  //   (product) =>
  //     product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
  //     (selectedCategory === "전체" || product.category === selectedCategory)
  // );

  return (
    <div className="container d-flex">
      {/* 사이드바 */}
      <ProductsSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          navigate(
            `/product?category=${encodeURIComponent(
              category
            )}&search=${encodeURIComponent(searchQuery)}`
          );
        }}
      />

      {/* 필터링된 상품 리스트 */}
      <ProductsList
        selectedCategory={selectedCategory}
        products={products}
        user={user}
      />
    </div>
  );
};

export default ProductsPage;
