import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/UI/Navbar";

const ProductPage: React.FC = () => {
  const { productId } = useParams();

  return <div><Navbar />{productId}</div>;
};

export { ProductPage };
