import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug, getProjects } from "../queries";
import { Project } from "../../types";
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

export const useGetProjectBySlug = (slug: string, initialData?: Project, locale?: string) => {
  return useQuery({
    queryKey: [keys.PROJECT_BY_SLUG, slug, locale],
    queryFn: () => getProjectBySlug(slug, locale),
    initialData,
    ...defaultOptionsReactQuery,
  });
};
