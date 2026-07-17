import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug, getProjects } from "../queries";
import { Project } from "../../types";
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

export const useGetProjectBySlug = (slug: string, initialData?: Project) => {
  return useQuery({
    queryKey: [keys.PROJECT_BY_SLUG, slug],
    queryFn: () => getProjectBySlug(slug),
    initialData,
    ...defaultOptionsReactQuery,
  });
};
