import React, { useEffect, useState } from "react";

const reverseCategoryMap = {
  전체: "ALL",
  의류: "CLOTHING",
  IT: "IT",
  문구: "STATIONERY",
  악기: "INSTRUMENT",
};

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
        {categories.map((category, index) => {
          const mappedCategory =
            reverseCategoryMap[category.name] ?? category.name;
          return (
            <li
              key={index}
              className={`py-2 ${
                selectedCategory === mappedCategory
                  ? "fw-bold text-primary active"
                  : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => onSelectCategory(mappedCategory)}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ProductsSidebar;
