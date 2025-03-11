import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import Shop from "../Components/Shop";
import ShopCategory from "../Components/ShopCategory";
import ProductDetail from "../Components/ProductDetail";
import Comments from "../Components/Comments";

function Store() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Shop />} />
          <Route path="category/:category" element={<ShopCategory />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="comments/:productId" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Store;