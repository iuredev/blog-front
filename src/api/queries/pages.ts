import axios from "axios";
import { PageType, Page } from "../../types";

export const getPage = async (page: PageType, locale?: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        params: {
          populate: "*",
          ...(locale && { locale }),
        },
      }
    );
    return response.data.data as Page;
  } catch {
    return null;
  }
};
