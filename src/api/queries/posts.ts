import axios from "axios";
import { DataFromApi, Post } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async (pageSize: number, page?: number) => {
  const response = await axios.get(
    `${NEXT_API_URL}/articles?pagination[page]=${
      page || 1
    }&pagination[pageSize]=${pageSize}&populate=*&sort=createdAt:desc`,
    {
      headers: {
        Authorization: `Bearer ${NEXT_API_KEY}`,
      },
    }
  );

  return response.data as DataFromApi<Post[]>;
};

export const getPostBySlug = async (slug: string) => {
  const response = await axios.get(
    `${NEXT_API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${NEXT_API_KEY}`,
      },
    }
  );

  return response.data.data[0] as Post;
};
