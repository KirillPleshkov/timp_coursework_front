import axios from "axios";
import { TypeProduct } from "../types/TypeProduct";

type TypeProducts = TypeProduct[];

const fetchProducts = (token: string | null) => {
  return axios.get<TypeProducts>(`http://localhost:3001/product/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchProducts };
