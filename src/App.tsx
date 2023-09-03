import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Product } from "./pages/Product";
import { Navbar } from "./components/UI/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
