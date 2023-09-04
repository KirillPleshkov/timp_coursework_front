import { useQuery } from "@tanstack/react-query";
import { fetchSearch } from "../api/fetchSearch";

const useSearch = (searchValue: string) => {
  return useQuery({
    queryKey: [searchValue],
    queryFn: () => fetchSearch(searchValue),
    select: ({ data }) => data,
  });
};

export { useSearch };
