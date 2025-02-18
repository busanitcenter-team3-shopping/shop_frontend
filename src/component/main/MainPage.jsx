import React from "react";
import Banner from "./Banner";
import FamousProduct from "./FamousProduct";
import CategoryButtons from "./CategoryButtons";

const MainPage = ({ user, products }) => {
  return (
    <div>
      <Banner />
      <CategoryButtons />
      <FamousProduct user={user} products={products} />
    </div>
  );
};

export default MainPage;
