import axios from "axios";

type TypeCategoriesName = {
  id: number;
  name: string;
  imageUrl: string;
};

const fetchCategoriesName = () => {
  return axios.get<TypeCategoriesName[]>("/category/");
};

export { fetchCategoriesName };
export type { TypeCategoriesName };
