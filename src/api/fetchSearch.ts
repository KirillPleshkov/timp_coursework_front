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
  return axios.get<TypeResponse>(`http://localhost:3001/search?search=${searchQuery}`);
};

export { fetchSearch };
export type { TypeResponse, TypeElement };
