import axios from "axios";

type TypeCategory = {
  id: number;
  name: string;
  imageUrl: string;
};

const fetchCategories = (searchQuery?: string) => {
  return axios.get<TypeCategory[]>(`/category?search=${searchQuery}`);
};

export { fetchCategories };
export type { TypeCategory };
