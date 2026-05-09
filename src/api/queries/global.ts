import axios from "axios";
import { Global } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getGlobal = async (): Promise<Global | null> => {
  try {
    const response = await axios.get(`${NEXT_API_URL}/global?populate=*`, {
      headers: {
        Authorization: `Bearer ${NEXT_API_KEY}`,
      },
    });
    return response.data.data as Global;
  } catch {
    return null;
  }
};

export const getStrapiMediaUrl = (url?: string): string | null => {
  if (!url) return null;
  const base = NEXT_API_URL?.replace("/api", "") ?? "";
  return url.startsWith("http") ? url : `${base}${url}`;
};
