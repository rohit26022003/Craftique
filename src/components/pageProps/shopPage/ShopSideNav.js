import Category from "./shopBy/Category";
import Price from "./shopBy/Price";
import React from "react";

const ShopSideNav = ({ setSelectedCategory, setSelectedPriceRange, products }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category setSelectedCategory={setSelectedCategory} />
      <Price setSelectedPriceRange={setSelectedPriceRange} products={products} />
    </div>
  );
};

export default ShopSideNav;