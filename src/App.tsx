import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { CategoryPage } from "./pages/CategoryPage";
import SymptomPage from "./pages/SymptomPage";
import TokenContext from "./context/TokenContext";

function App() {
  return (
    <TokenContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="symptom/:symptomId" element={<SymptomPage />} />
        </Routes>
      </BrowserRouter>
    </TokenContext>
  );
}

export default App;
