import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/UI/Navbar";

const Product: React.FC = () => {
  const { productId } = useParams();

  return <div><Navbar />{productId}</div>;
};

export { Product };
