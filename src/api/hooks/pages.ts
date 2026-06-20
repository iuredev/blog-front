import { useQuery } from "@tanstack/react-query";
import { getPage } from "../queries/pages";
import { keys } from "../keys";
import { PageType } from "../../types";
import { defaultOptionsReactQuery } from "./utils";

export const useGetPage = (page: PageType, locale?: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.PAGES, page, locale],
    queryFn: () => getPage(page, locale),
    ...defaultOptionsReactQuery,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
