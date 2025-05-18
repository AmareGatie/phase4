import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Results from "../Pages/Results/Results";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import Product from "../components/Product/Product";
import Cart from "../Pages/Cart/Cart";
import Auth from "../Pages/Auth/Auth";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" component={<Auth />}></Route>
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
