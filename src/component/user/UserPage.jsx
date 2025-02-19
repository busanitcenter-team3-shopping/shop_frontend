import React, { useEffect, useState } from "react";
import "../products/ProductsList.css";
import "./userPage.css";
import Pagination from "../products/Pagination";
import { Link, useParams } from "react-router-dom";

const UserPage = ({ user, products }) => {
  const { user_id } = useParams();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);

  const userProducts = products.filter(
    (product) => String(product.user_id) === user_id
  );
  console.log(userProducts);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const foundUser = storedUsers.find((u) => String(u.user_id) === user_id);
    console.log(foundUser);
    setUsers(foundUser);
  }, [user_id]);

  const [likedItems, setLikedItems] = useState({});

  // 좋아요 불러오기
  useEffect(() => {
    if (user && user.user_id) {
      const storedLikes =
        JSON.parse(localStorage.getItem(`likeProducts_${user.user_id}`)) || [];
      setLikedItems(storedLikes);
    }
  }, [user]);

  // 변경될때마다 저장
  useEffect(() => {
    if (user && user.user_id) {
      localStorage.setItem(
        `likeProducts_${user.user_id}`,
        JSON.stringify(likedItems)
      );
    }
  }, [likedItems, user]);

  // 로컬에 좋아요 저장
  const toggleLike = (id) => {
    setLikedItems((prev) => {
      const updatedLikes = { ...prev };
      if (updatedLikes[id]) {
        delete updatedLikes[id]; // 찜 해제
      } else {
        updatedLikes[id] = true; // 찜 추가
      }

      localStorage.setItem(
        `likeProducts_${user.user_id}`,
        JSON.stringify(updatedLikes)
      );

      return updatedLikes;
    });
  };

  // 현재 페이지의 상품 계산
  const totalPages = Math.ceil(userProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = userProducts.slice(startIndex, endIndex);

  return (
    <div className="container container1">
      <main className="flex-grow-1 p-4">
        <h2 className="text-center mb-3 mt-3">{users.name}님의 상품목록</h2>

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

        {userProducts.length === 0 && (
          <p className="text-center mt-4">등록된 상품이 없습니다.</p>
        )}

        {/* 상품 그리드 */}
        <div className="product-container row1">
          {currentProducts.map((product, index) => (
            <div key={index} className="card">
              <Link to={`/product/${product.product_id}`}>
                <div className="position-relative card-img">
                  <img
                    src={product.images?.[0]}
                    className="card-img-top"
                    alt="..."
                  />
                  <img
                    src={
                      likedItems[product.product_id]
                        ? "/colorHeart.png"
                        : "/heart.png"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(product.product_id);
                    }}
                    alt="찜"
                    className="heart"
                  />
                </div>
                <div className="card-body">
                  <p className="card-title">{product.title}</p>
                  <p className="card-price mb-0">
                    {product.price.toLocaleString()}원
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <Pagination
          totalItems={userProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default UserPage;
