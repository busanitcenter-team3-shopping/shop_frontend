import React from "react";

const categories = ["IT", "카메라", "렌즈", "액세서리"];

function ProductsSidebar({ selectedCategory, onSelectCategory }) {
  return (
    <aside
      className="bg-light p-4"
      style={{ width: "200px", minHeight: "100vh" }}
    >
      <h4 className="fw-bold">카테고리</h4>
      <ul className="list-unstyled">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`py-2 ${
              selectedCategory === cat ? "fw-bold text-primary" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ProductsSidebar;
