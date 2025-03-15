import React, { useEffect, useState } from "react";
import "../products/ProductsList.css";
import "./userPage.css";
import Pagination from "../products/Pagination";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";

const UserPage = ({ user }) => {
  const { user_id } = useParams();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get(`/product/user-page/${user_id}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("상품 로드 실패:", error));
  }, []);

  useEffect(() => {
    api
      .get(`/user/${user_id}`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("유저 로드 실패:", error));
  }, []);

  const BASE_URL = "http://172.30.1.71:8090";

  const [likedItems, setLikedItems] = useState({});

  // 현재 페이지의 상품 계산
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="container container1">
      <main className="flex-grow-1 p-4">
        <h2 className="text-center mb-3 mt-3">{users.username}님의 상품목록</h2>

        {/* 페이지당 아이템 개수 선택 */}
        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select w-auto"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // ~~개씩 보기 눌렀을때 1페이지로 전환하려고고
            }}
          >
            {[12, 24, 36].map((num) => (
              <option key={num} value={num}>
                {num}개씩 보기
              </option>
            ))}
          </select>
        </div>

        {currentProducts.length === 0 && (
          <p className="text-center mt-4">등록된 상품이 없습니다.</p>
        )}

        {/* 상품 그리드 */}
        <div className="product-container row row1">
          {currentProducts.map((product, index) => (
            <div key={index}>
              <Link to={`/product/${product.productId}`}>
                <div className="card">
                  <div className="position-relative card-img">
                    {product.status === "판매중" ? (
                      <>
                        <img
                          src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                          className="card-img-top"
                          alt={product.description}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={`${BASE_URL}/product/images/${product.images?.[0]?.imageName}`}
                          className="card-img-top opacity-50"
                          alt={product.description}
                        />
                        <img
                          className="soldout-user"
                          src="/soldout1.png"
                          alt="판매완료"
                        />
                      </>
                    )}
                  </div>
                  <div className="card-body">
                    <p className="card-title">{product.title}</p>
                    <p className="card-price mb-0">
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <Pagination
          totalItems={currentProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default UserPage;
