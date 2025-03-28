import axios from "axios";
import { PageType, Page } from "../../types";

export const getPage = async (page: PageType) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/${page}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );

  return response.data.data as Page;
};
