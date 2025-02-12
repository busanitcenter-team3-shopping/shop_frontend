import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      {/* 이전 버튼 (첫 페이지에서 비활성화) */}
      <button
        className="btn btn-outline-dark me-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* 페이지 번호 */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={`btn mx-1 ${
            currentPage === index + 1
              ? "btn-dark text-white"
              : "btn-outline-dark"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      {/* 다음 버튼 (마지막 페이지에서 비활성화) */}
      <button
        className="btn btn-outline-dark ms-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
