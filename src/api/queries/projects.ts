import axios from "axios";
import { DataFromApi, Project } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;
const PROJECTS_QUERY = "populate=*&sort[0]=featured:desc&sort[1]=featuredOrder:asc&sort[2]=publishedAt:desc";

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

export const getProjectBySlug = async (slug: string, locale?: string): Promise<Project | null> => {
  try {
    const requestProject = (requestedLocale?: string) => axios.get<DataFromApi<Project[]>>(
      `${NEXT_API_URL}/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      {
        params: {
          ...(requestedLocale && { locale: requestedLocale }),
        },
        headers: { Authorization: `Bearer ${NEXT_API_KEY}` },
      }
    );

    const localizedProject = (await requestProject(locale)).data.data[0];
    if (localizedProject || !locale) return localizedProject ?? null;

    return (await requestProject()).data.data[0] ?? null;
  } catch {
    return null;
  }
};
