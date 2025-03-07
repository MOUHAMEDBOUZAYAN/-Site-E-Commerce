import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Components/Shop";
import ProductDetail from "./Components/ProductDetail";
import Nav from "./Components/Nav";
import ShopCategory from "./Components/ShopCategory";

function Store() {
  return (
    <Router>
      <div className="container mx-auto">
        <Nav />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/women" element={<ShopCategory category="women" />} />
          <Route path="/sport" element={<ShopCategory category="sport" />} />
          <Route path="/home" element={<ShopCategory category="home" />} />
          <Route path="/electronique" element={<ShopCategory category="electronique" />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Store