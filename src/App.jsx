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
import CartPage from "./component/user/CartPage";
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

// 해야할 일 : (공지사항), 메세지, 찜, 주문내역, 리뷰, 판매완료시 이미지 변환
function App({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  // 로컬 데이터 지우기
  // localStorage.clear();

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

      {/* <Chat /> */}
      <Routes>
        <Route
          path="/"
          element={<MainPage user={user} products={products} />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <ProductRegister addProduct={addProduct} />
            </PrivateRoute>
          }
        />
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
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <Mypage user={user} setUser={setUser} products={products} />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatRoomList />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:chatRoomId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={<ProductsPage products={products} user={user} />}
        />
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
        <Route
          path="/user-board/:user_id"
          element={<UserBoard user={user} products={products} />}
        />
        <Route
          path="/user-page/:user_id"
          element={<UserPage user={user} products={products} />}
        />{" "}
        <Route path="/edit-user" element={<Signup setUser={setUser} />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute user={user}>
              <CartPage user={user} />
            </PrivateRoute>
          }
        />
        <Route path="/notice-board" element={<NoticeBoard />} />
        <Route path="/notice-write" element={<NoticeWrite />} />
        <Route path="/notice-write" element={<NoticeWrite />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/add-review" element={<ReviewRegister />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route
          path="/wishlist"
          element={<Wishlist user={user} products={products} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
