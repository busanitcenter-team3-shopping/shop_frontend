import React from "react";
import Banner from "./Banner";
import FamousProduct from "./FamousProduct";
import CategoryButtons from "./CategoryButtons";

const MainPage = () => {
  return (
    <div>
      <Banner />
      <CategoryButtons />
      <FamousProduct />
    </div>
  );
};

export default MainPage;
