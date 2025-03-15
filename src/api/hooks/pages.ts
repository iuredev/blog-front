import { useQuery } from "@tanstack/react-query";
import { getPage } from "../queries/pages";
import { keys } from "../keys";
import { PageType } from "../../types";

const defaultConfig = {
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60,
  cacheTime: 1000 * 60,
};

export const useGetPage = (page: PageType) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.PAGES, page],
    queryFn: () => getPage(page),
    ...defaultConfig,
  });

  return {
    data: data?.data,
    isLoading,
    isFetching,
    isError,
  };
};
