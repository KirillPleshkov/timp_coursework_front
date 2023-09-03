import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/fetchProducts";

const useSearchProducts = (searchValue: string) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['product', searchValue],
    queryFn: () => fetchProducts(searchValue),
    select: ({ data }) => data,
  });

  return {
    productsIsLoading: isLoading,
    productsError: error,
    productsData: data,
  };
};

export { useSearchProducts };
