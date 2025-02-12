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

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product" element={<DetailProduct />} />
        <Route path="/brand" element={<BrandList />} />
        <Route path="/CartPage" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
