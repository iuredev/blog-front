import axios from "axios";
import { Category } from "../../types";

const NEXT_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${NEXT_API_URL}/categories?sort=name:asc`, {
      headers: {
        Authorization: `Bearer ${NEXT_API_KEY}`,
      },
    });
    return response.data.data as Category[];
  } catch {
    return [];
  }
};
