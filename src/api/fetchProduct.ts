import axios from "axios";
import { TypeProduct } from "../types/TypeProduct";

const fetchProduct = (token: string | null, id?: number | string) => {
  return axios.get<TypeProduct>(`/product/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchProduct };
