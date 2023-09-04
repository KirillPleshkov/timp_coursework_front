import axios from "axios";

type TypeElement = {
  id: number;
  name: string;
};

type TypeResponse = {
  products: TypeElement[];
  categories: TypeElement[];
};

const fetchSearch = (searchQuery?: string) => {
  return axios.get<TypeResponse>(`/search?search=${searchQuery}`);
};

export { fetchSearch };
export type { TypeResponse, TypeElement };
