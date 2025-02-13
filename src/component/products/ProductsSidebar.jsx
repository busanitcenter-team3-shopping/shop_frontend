import React from "react";

const categories = [
  { id: 1, name: "전체", icon: "로 고" },
  { id: 2, name: "IT", icon: "⚙️" },
  { id: 3, name: "의류", icon: "👕" },
  { id: 4, name: "문구", icon: "📜" },
  { id: 5, name: "악기", icon: "🎻" },
];

function ProductsSidebar({ selectedCategory, onSelectCategory }) {
  return (
    <aside
      className="bg-light p-4"
      style={{ width: "200px", minHeight: "100vh" }}
    >
      <h4 className="fw-bold">카테고리</h4>
      <ul className="list-unstyled">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`py-2 ${
              selectedCategory === category.id ? "fw-bold text-primary" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ProductsSidebar;
