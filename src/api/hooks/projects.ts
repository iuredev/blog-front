import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../queries";
import { keys } from "../keys";
import { defaultOptionsReactQuery } from "./utils";

export const useGetProjects = (locale?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [keys.PROJECTS, locale],
    queryFn: () => getProjects(locale),
    ...defaultOptionsReactQuery,
  });

  return {
    projects: data?.data ?? [],
    isLoading,
    isError,
  };
};
