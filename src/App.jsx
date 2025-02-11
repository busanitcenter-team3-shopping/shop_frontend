import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./component/main/Navbar";
import Banner from "./component/main/Banner";
import FamousBrand from "./component/main/FamousBrand";
import FamousProduct from "./component/main/FamousProduct";
import ProductsPage from "./component/products/ProductsPage";
import BrandList from "./component/products/BrandList";

function App() {
  return (
    <>
      {/* <Navbar />
      <Banner />
      <FamousProduct />
      <FamousBrand /> */}
      {/* <ProductsPage /> */}
      <BrandList />
    </>
  );
}

export default App;
