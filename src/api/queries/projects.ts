import axios from "axios";
import { DataFromApi, Project } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;
const PROJECTS_QUERY = "populate=*&sort=publishedAt:desc";

const requestProjects = (locale?: string) => axios.get<DataFromApi<Project[]>>(
  `${NEXT_API_URL}/projects?${PROJECTS_QUERY}`,
  {
    params: {
      ...(locale && { locale }),
    },
    headers: {
      Authorization: `Bearer ${NEXT_API_KEY}`,
    },
  }
);

export const getProjects = async (locale?: string): Promise<DataFromApi<Project[]> | null> => {
  try {
    const defaultResponse = await requestProjects();
    if (!locale) return defaultResponse.data;

    const localizedResponse = await requestProjects(locale);
    const localizedProjects = new Map(
      localizedResponse.data.data.map((project) => [project.documentId, project])
    );

    return {
      ...defaultResponse.data,
      data: defaultResponse.data.data.map(
        (project) => localizedProjects.get(project.documentId) ?? project
      ),
    };
  } catch {
    return null;
  }
};
