import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CategoryButtons.css";

const reverseCategoryMap = {
  전체: "ALL",
  의류: "CLOTHING",
  IT: "IT",
  문구: "STATIONERY",
  악기: "INSTRUMENT",
};

function CategoryButtons() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://172.30.1.71:8090/enum")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    const categoryEnglish = reverseCategoryMap[categoryName] || categoryName;
    navigate(`/product?category=${categoryEnglish}`);
  };
  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <div key={index} className="category-wrapper">
          <button
            className="category-button"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </button>
        </div>
      ))}
    </div>
  );
}

export default CategoryButtons;
