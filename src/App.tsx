import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { CategoryPage } from "./pages/CategoryPage";
import SymptomPage from "./pages/SymptomPage";
import TokenContext from "./context/TokenContext";
import { AuthorizationContext } from "./context/AuthorizationContext";
import { BasketPage } from "./pages/BasketPage";

function App() {
  return (
    <TokenContext>
      <AuthorizationContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:productId" element={<ProductPage />} />
            <Route path="category/:categoryId" element={<CategoryPage />} />
            <Route path="symptom/:symptomId" element={<SymptomPage />} />
            <Route path="basket" element={<BasketPage />} />
          </Routes>
        </BrowserRouter>
      </AuthorizationContext>
    </TokenContext>
  );
}

export default App;
