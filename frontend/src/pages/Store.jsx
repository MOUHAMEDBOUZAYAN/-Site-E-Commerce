import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "../Components/Shop";
import ShopCategory from "../Components/ShopCategory";
import ProductDetail from "../Components/ProductDetail";
import Comments from "../components/Comments";



function Store() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/category/:category" element={<ShopCategory />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/comments/:productId" element={<Comments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Store;