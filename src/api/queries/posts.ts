import axios from "axios";
import { DataFromApi, Post } from "../../types";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getPosts = async (pageSize: number, page?: number) => {
  console.log("url", VITE_API_URL);
  console.log("key", VITE_API_KEY);

  const response = await axios.get(
    `/api/articles?pagination[page]=${
      page || 1
    }&pagination[pageSize]=${pageSize}&populate=*&sort=createdAt:desc`,
    {
      headers: {
        Authorization: `Bearer ${VITE_API_KEY}`,
      },
    }
  );

  return response.data as DataFromApi<Post[]>;
};

export const getPostBySlug = async (slug: string) => {
  const response = await axios.get(
    `/api/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${VITE_API_KEY}`,
      },
    }
  );

  return response.data.data[0] as Post;
};
