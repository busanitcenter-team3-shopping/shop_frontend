import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./component/main/Navbar";
import MainPage from "./component/main/MainPage";
import Login from "./component/user/Login";
import Signup from "./component/user/Signup";
import ProductsPage from "./component/products/ProductsPage";
import BrandList from "./component/products/BrandList";
import DetailProduct from "./component/product/DetailProduct";
import Mypage from "./component/user/Mypage";
import CartPage from "./component/user/CartPage";
import CustomerCenter from "./component/main/CustomerCenter";
import { useEffect, useState } from "react";
import PrivateRoute from "./component/user/PrivateRoute";
import BrandPage from "./component/products/BrandPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mypage"
          element={
            <PrivateRoute user={user}>
              <Mypage user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product" element={<DetailProduct />} />
        <Route path="/brand-list" element={<BrandList />} />
        <Route path="/edit-user" element={<Signup />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute user={user}>
              <CartPage user={user} />
            </PrivateRoute>
          }
        />
        <Route path="/service" element={<CustomerCenter />} />
        <Route path="/brand" element={<BrandPage />} />
      </Routes>
    </Router>
  );
}

export default App;
