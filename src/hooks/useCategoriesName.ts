import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesName } from "../api/fetchCategoriesName";

const useCategoriesName = () => {
  return useQuery({
    queryKey: ["CategoriesName"],
    queryFn: () => fetchCategoriesName(),
    select: ({ data }) => data,
  });
};

export { useCategoriesName };
