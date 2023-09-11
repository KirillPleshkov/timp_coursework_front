import axios from "axios";
import { TypeProduct } from "../types/TypeProduct";

const fetchProduct = (id?: number | string) => {
  return axios.get<TypeProduct>(`/product/${id}`);
};

export { fetchProduct };
