import axios from "axios";
import { TypeProduct } from "../types/TypeProduct";

type TypeCategory = {
  name: string;
  products: TypeProduct[];
};

const fetchCategory = (id?: number | string) => {
  return axios.get<TypeCategory>(`/category/${id}`);
};

export { fetchCategory };
