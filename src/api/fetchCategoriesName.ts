import axios from "axios";

type TypeCategoriesName = {
  id: number;
  name: string;
};

const fetchCategoriesName = () => {
  return axios.get<TypeCategoriesName[]>("http://localhost:3001/category/");
};

export { fetchCategoriesName };
export type { TypeCategoriesName };
