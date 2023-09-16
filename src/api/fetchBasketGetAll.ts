import axios from "axios";
import { TypeProduct } from "../types/TypeProduct";

type TypeBasketGetAll = {
  id: number;
  count: number;
  product: TypeProduct;
};

const fetchBasketGetAll = (token: string | null) => {
  return axios.get<TypeBasketGetAll[]>("http://localhost:3001/basket/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchBasketGetAll };
