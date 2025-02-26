import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CategoryButtons.css";


function CategoryButtons() {
  const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch("http://localhost:8090/enum")
  .then((res) => res.json())
  .then((data) => setCategories(data))
  .catch((err) => console.log(err))
},[])
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
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
