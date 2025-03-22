import { useQuery } from "@tanstack/react-query";
import { getPage } from "../queries/pages";
import { keys } from "../keys";
import { PageType } from "../../types";
import { defaultOptionsReactQuery } from "./utils";

export const useGetPage = (page: PageType) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.PAGES, page],
    queryFn: () => getPage(page),
    ...defaultOptionsReactQuery,
  });

  return {
    data: data?.data,
    isLoading,
    isFetching,
    isError,
  };
};
