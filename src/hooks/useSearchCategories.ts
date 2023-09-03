import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/fetchCategories";

const useSearchCategories = (searchValue: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["category", searchValue],
    queryFn: () => fetchCategories(searchValue),
    select: ({ data }) => data,
  });

  return {
    categoriesIsLoading: isLoading,
    categoriesError: error,
    categoriesData: data,
  };
};

export { useSearchCategories };
