import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./Navbar";
import Banner from "./Banner";
import FamousBrand from "./component/FamousBrand";
import FamousProduct from "./component/FamousProduct";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <FamousProduct />
      <FamousBrand />
    </>
  );
}

export default App;
