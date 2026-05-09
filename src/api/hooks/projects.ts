import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../queries";
import { keys } from "../keys";
import { defaultOptionsReactQuery } from "./utils";

export const useGetProjects = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [keys.PROJECTS],
    queryFn: getProjects,
    ...defaultOptionsReactQuery,
  });

  return {
    projects: data?.data ?? [],
    isLoading,
    isError,
  };
};
