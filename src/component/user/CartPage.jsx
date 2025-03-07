import React, { useState } from "react";
import "./CartPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CartPage = ({ user }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [quantities, setQuantities] = useState({});
  const BASE_SHIPPING_FEE = 3000;
  const FREE_SHIPPING_THRESHOLD = 300000;

  //const items = [
  //  { id: 1, name: "Lion X s24", price: 100000, image: "lion.png" },
  //  { id: 2, name: "Lion X s25", price: 40000, image: "lion.png" },
  //  { id: 3, name: "Lion X s26", price: 10000, image: "lion.png" },
  //];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id) => {
    let newSelectedItems;
    if (selectedItems.includes(id)) {
      newSelectedItems = selectedItems.filter((itemId) => itemId !== id);
    } else {
      newSelectedItems = [...selectedItems, id];
    }
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === items.length);
  };

  const handleQuantityChange = (id, amount) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(1, (prevQuantities[id] || 1) + amount);
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const handleDeleteSelected = () => {
    setSelectedItems([]);
    setSelectAll(false);
  };

  const totalItemPrice = selectedItems.reduce(
    (total, id) =>
      total +
      (items.find((item) => item.id === id)?.price || 0) *
        (quantities[id] || 1),
    0
  );

  const shippingFee =
    totalItemPrice >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING_FEE;
  const totalPrice = totalItemPrice > 0 ? totalItemPrice + shippingFee : "";

  return (
    <div className="cart-container">
      <h2 className="cart-title">{user.name}님의 장바구니</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectAll}
              />
            </th>
            <th></th>
            <th>상품</th>
            <th>수량</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </td>
              <td className="product-info">
                <div className="product-img-wrapper">
                  <img src={item.image} className="product-image" />
                </div>
              </td>
              <td>
                <span className="product-name">{item.name}</span>
              </td>
              <td>
                <button
                  className="quantity-btn btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </button>
                <span className="quantity-2">{quantities[item.id] || 1}</span>
                <button
                  className="quantity-btn btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                </button>
              </td>
              <td>
                {(item.price * (quantities[item.id] || 1)).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItems.length > 0 && (
        <div className="cart-summary">
          <div className="summary-box">
            <span>총 {selectedItems.length}개의 상품금액</span>
            <span className="total-price">
              {totalItemPrice.toLocaleString()}
            </span>
            <span className="separator"></span>
            <img
              src="public/free-icon-add-4942893.png"
              alt="+"
              className="add-image"
            />
            <span>배송비</span>
            <span className="shipping-fee">{shippingFee.toLocaleString()}</span>
            <span className="separator"></span>
            <img
              src="public/free-icon-equals-sign-6399426.png"
              alt="="
              className="equals-image"
            />
            <span>합계</span>
            {totalItemPrice > 0 && (
              <span className="final-price">{totalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      )}
      <div className="cart-actions">
        <button
          className="delete-btn btn btn-danger"
          onClick={handleDeleteSelected}
          disabled={selectedItems.length === 0}
        >
          <i className="bi bi-trash"></i> 선택상품 삭제하기
        </button>
        <button className="purchase-btn btn btn-primary">
          <i className="bi bi-cart-check"></i> 선택상품 구매하기
        </button>
      </div>
    </div>
  );
};

export default CartPage;
