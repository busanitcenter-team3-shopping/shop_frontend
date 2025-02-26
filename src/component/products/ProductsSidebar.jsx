import React, { useEffect, useState } from "react";

function ProductsSidebar({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8090/enum")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <aside
      className="bg-light p-4"
      style={{ width: "200px", minHeight: "100vh" }}
    >
      <h4 className="fw-bold">카테고리</h4>
      <ul className="list-unstyled sidebar-list">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`py-2 ${
              selectedCategory === category.name
                ? "fw-bold text-primary active"
                : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => onSelectCategory(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ProductsSidebar;
