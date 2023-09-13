import axios from "axios";
import { TypeProduct } from "../types/TypeProduct";

type TypeCategory = {
  name: string;
  products: TypeProduct[];
};

const fetchCategory = (token: string | null, id?: number | string) => {
  return axios.get<TypeCategory>(`/category/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchCategory };
