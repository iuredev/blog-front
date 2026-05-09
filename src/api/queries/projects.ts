import axios from "axios";
import { DataFromApi, Project } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProjects = async (): Promise<DataFromApi<Project[]> | null> => {
  try {
    const response = await axios.get(
      `${NEXT_API_URL}/projects?populate=*&sort=publishedAt:desc`,
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
