import axios from "axios";
import { DataFromApi, Project } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProjects = async (): Promise<DataFromApi<Project[]> | null> => {
  try {
    const response = await axios.get(
      `${NEXT_API_URL}/projects?populate=*&sort[0]=featured:desc&sort[1]=featuredOrder:asc&sort[2]=publishedAt:desc`,
      {
        headers: {
          Authorization: `Bearer ${NEXT_API_KEY}`,
        },
      }
    );
    return response.data as DataFromApi<Project[]>;
  } catch {
    return null;
  }
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const response = await axios.get(
      `${NEXT_API_URL}/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      { headers: { Authorization: `Bearer ${NEXT_API_KEY}` } }
    );
    const data = response.data as DataFromApi<Project[]>;
    return data.data[0] ?? null;
  } catch {
    return null;
  }
};
