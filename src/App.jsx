import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./component/main/Navbar";
import MainPage from "./component/main/MainPage";
import Login from "./component/user/Login";
import Signup from "./component/user/Signup";
import ProductsPage from "./component/products/ProductsPage";
import DetailProduct from "./component/product/DetailProduct";
import Mypage from "./component/user/Mypage";
import { useEffect, useState } from "react";
import PrivateRoute from "./component/user/PrivateRoute";
import ProductRegister from "./component/product/ProductRegister";
import NoticeWrite from "./component/main/NoticeWrite";
import OrderHistory from "./component/user/OrderHistory";
import ReviewRegister from "./component/user/ReviewRegister";
import ReviewPage from "./component/user/ReviewPage";
import UserPage from "./component/user/UserPage";
import UserBoard from "./component/user/UserBoard";
import Wishlist from "./component/products/Wishlist";
import NoticeBoard from "./component/main/NoticeBoard";
import Chat from "./component/chat/Chat";
import ChatRoomList from "./component/chat/ChatRoomList";
import SalesHistory from "./component/user/SalesHistory";

import SellerReviewRegister from "./component/user/SellerReviewRegister";

import { useMyContext } from "./api/ContextApi";
import api from "./api/axiosInstance";

// 해야할 일 :리뷰,카카오로그인, 배포
// userBoard, ReviewRegister, ReviewPage(임시값), orderHistory(임시값), mypage, NoticeWrite  주석 지우기
// 관리자가 회원관리 할건지

function App({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // 수정상품
  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.product_id === updatedProduct.product_id
        ? updatedProduct
        : product
    );

    setProducts(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* 메인 화면 */}
        <Route
          path="/"
          element={<MainPage user={user} products={products} />}
        />
        {/* 로그인 */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* 회원가입 */}
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        {/* 상품 등록 */}
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <ProductRegister addProduct={addProduct} />
            </PrivateRoute>
          }
        />

        {/* 상품 수정 */}
        <Route
          path="/edit-product"
          element={
            <PrivateRoute user={user}>
              <ProductRegister
                addProduct={addProduct}
                updateProduct={updateProduct}
                products={products}
              />
            </PrivateRoute>
          }
        />

        {/* 접속중인 마이페이지 */}
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <Mypage user={user} setUser={setUser} products={products} />
            </PrivateRoute>
          }
        />

        {/* 접속중인 유저의 전체 메시지함 */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatRoomList />
            </PrivateRoute>
          }
        />

        {/* 채팅방 */}
        <Route
          path="/chat/:chatRoomId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        {/* 전체상품 */}
        <Route
          path="/product"
          element={<ProductsPage products={products} user={user} />}
        />

        {/* 상품 디테일 */}
        <Route
          path="/product/:product_id"
          element={
            <DetailProduct
              user={user}
              products={products}
              setProducts={setProducts}
              updateProduct={updateProduct}
            />
          }
        />

        {/* 판매자 페이지 */}
        <Route
          path="/user-board/:user_id"
          element={<UserBoard user={user} products={products} />}
        />

        {/* 회원 수정 */}
        <Route
          path="/user-page/:user_id"
          element={<UserPage user={user} products={products} />}
        />

        {/* 회원 수정 */}
        <Route path="/edit-user" element={<Signup setUser={setUser} />} />

        {/* 전체 공지 */}
        <Route path="/notice-board" element={<NoticeBoard />} />

        {/* 공지 작성 */}
        <Route path="/notice-write" element={<NoticeWrite />} />

        {/* 주문 내역 */}
        <Route path="/orderhistory" element={<OrderHistory />} />

        {/* 판매 내역 */}
        <Route path="/saleshistory" element={<SalesHistory />} />

        {/* 구매자 리뷰 등록 */}
        <Route path="/add-review/:purchaseId" element={<ReviewRegister />} />

        {/* 판매자 리뷰 등록 */}
        <Route
          path="/add-review/seller/:purchaseId"
          element={<SellerReviewRegister />}
        />

        {/* 전체 리뷰 */}
        <Route path="/review/:userId" element={<ReviewPage />} />

        {/* 찜한 상품 */}
        <Route
          path="/wishlist"
          element={<Wishlist user={user} products={products} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
