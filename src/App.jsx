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
import ProductRegister from "./component/product/ProductRegister";

// 1.지금 문제는 제가 props를 사용해서 전부 값을 넘기고 있는데
// useContext를 활용 해서 전역으로 사용할수 있도록 바꾸는것이 효율적이라 이 방법은 다 같이 토론합시다(사용 방법이 기억나는 사람이 있으면 도와주세요....)

// 2. 백을 구현안하고 프론트만 일단 구현하고 있어서 jwt토큰을 활용 못해서 로컬스토리지에 일단 모든 값들을 저장시키도록 만들어서 나중에 그 부분은 백엔드 구현하면서 하나씩 전부 수정해야합니다.

// 상품을 추가하면 출력이 되도록 수정은 했는데 이미지의 크기나 수정을 봐야함(ProductsList)
function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  // 로컬에 있는 상품들을 전역으로 쓰려고
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // 로컬 데이터 지우기
  // localStorage.clear()

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={<MainPage user={user} products={products} />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/add-product"
          element={<ProductRegister addProduct={addProduct} />}
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute user={user}>
              <Mypage user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={<ProductsPage products={products} />}
        />{" "}
        {/**상품 전체 항목 */}
        <Route
          path="/product/:product_id"
          element={<DetailProduct user={user} products={products} />}
        />
        <Route path="/brand-list" element={<BrandList products={products} />} />{" "}
        {/** 여기는 무슨 페이지로 할건지?????*/}
        <Route path="/edit-user" element={<Signup setUser={setUser} />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute user={user}>
              <CartPage user={user} />
            </PrivateRoute>
          }
        />
        <Route path="/service" element={<CustomerCenter />} />
        <Route path="/brand" element={<BrandPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
