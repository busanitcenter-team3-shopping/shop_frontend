import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CategoryButtons.css";

const categories = [
  { id: 1, name: "전체", icon: "📄" },
  { id: 2, name: "IT", icon: "⚙️" },
  { id: 3, name: "의류", icon: "👕" },
  { id: 4, name: "문구", icon: "📜" },
  { id: 5, name: "악기", icon: "🎻" },
];

function CategoryButtons() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate("/products", { state: { selectedCategory: categoryName } });
  };
  return (
    <div className="category-container">
      {categories.map((category) => (
        <div key={category.id} className="category-wrapper">
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
