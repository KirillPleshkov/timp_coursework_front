import axios from "axios";

type TypeProduct = {
  id: number;
  name: string;
  imageUrl: string;
  activeSubstance: string;
  maker: string;
  description: string;
  categoryName: string;
};

const fetchProducts = (searchQuery?: string) => {
  return axios.get<TypeProduct[]>(`/product?search=${searchQuery}`);
};

export { fetchProducts };
export type { TypeProduct };
