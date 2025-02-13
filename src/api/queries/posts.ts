// queries get the data from the API using axios
import axios from "axios";
import { DataFromApi, Post } from "../../types";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getPosts = async (limit: number) => {
  const response = await axios.get(
    `${VITE_API_URL}/articles?pagination[limit]=${limit}&populate=*&sort=publishedAt:desc`,
    {
      headers: {
        Authorization: `Bearer ${VITE_API_KEY}`,
      },
    }
  );

  console.log(response.data);

  return response.data as DataFromApi<Post[]>;
};

export const getPostBySlug = async (slug: string) => {
  const response = await axios.get(
    `${VITE_API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${VITE_API_KEY}`,
      },
    }
  );

  return response.data.data[0] as Post;
};

// export const useGetPostBySlug = (slug: string) => {
//   return useQuery({
//     queryKey: [keys.POST_BY_SLUG, slug],
//     queryFn: async () => {
//       const response = await axios.get(`${VITE_API_URL}/articles/${slug}`, {
//         headers: {
//           Authorization: `Bearer ${VITE_API_KEY}`,
//         },
//       });
//       return response.data;
//     },
//   });
// };

// export const useGetPostsByCategory = (category: string, limit: number) => {
//   return useQuery({
//     queryKey: [keys.POSTS, category],
//     queryFn: async () => {
//       const response = await axios.get(
//         `${}/articles?category=${category}&pagination[limit]=${limit}`
//       );
//       return response.data;
//     },
//   });
// };

// export const useGetPostsRelated = (id: number) => {
//   return useQuery({
//     queryKey: ["posts", id],
//     queryFn: async () => {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/posts?category=${id}`
//       );
//       return response.data;
//     },
//   });
// };
