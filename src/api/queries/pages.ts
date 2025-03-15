import axios from "axios";
import { DataFromApi, PageType, Page } from "../../types";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getPage = async (page: PageType) => {
  const response = await axios.get(`${VITE_API_URL}/${page}?populate=*`, {
    headers: {
      Authorization: `Bearer ${VITE_API_KEY}`,
    },
  });

  return response.data as DataFromApi<Page>;
};
