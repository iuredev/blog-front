import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../queries/categories";
import { keys } from "../keys";
import { defaultOptionsReactQuery } from "./utils";

export const useGetCategories = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: [keys.CATEGORIES],
    queryFn: getCategories,
    ...defaultOptionsReactQuery,
  });

  return { categories: data, isLoading };
};
