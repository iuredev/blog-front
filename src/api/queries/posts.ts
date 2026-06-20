import axios from "axios";
import { DataFromApi, Post } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async (pageSize: number, page?: number, categoryId?: number, locale?: string) => {
  try {
    const response = await axios.get(`${NEXT_API_URL}/articles`, {
      headers: { Authorization: `Bearer ${NEXT_API_KEY}` },
      params: {
        "pagination[page]": page || 1,
        "pagination[pageSize]": pageSize,
        populate: "*",
        sort: "createdAt:desc",
        ...(categoryId && { "filters[categories][id][$eq]": categoryId }),
        ...(locale && { locale }),
      },
    });
    return response.data as DataFromApi<Post[]>;
  } catch {
    return null;
  }
};

export const getPostBySlug = async (slug: string, locale?: string) => {
  try {
    const response = await axios.get(`${NEXT_API_URL}/articles`, {
      headers: { Authorization: `Bearer ${NEXT_API_KEY}` },
      params: {
        "filters[slug][$eq]": slug,
        populate: "*",
        ...(locale && { locale }),
      },
    });
    return (response.data.data[0] as Post) ?? null;
  } catch {
    return null;
  }
};
