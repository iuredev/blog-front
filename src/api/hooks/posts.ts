import { useQuery } from "@tanstack/react-query";
import { getPostBySlug, getPosts } from "../queries";
import { keys } from "../keys";

const defaultConfig = {
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60,
  cacheTime: 1000 * 60,
};
export const useGetPosts = (limit: number) => {
  return useQuery({
    queryKey: [keys.POSTS],
    queryFn: () => getPosts(limit),
    ...defaultConfig,
  });
};

export const useGetPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: [keys.POST_BY_SLUG, slug],
    queryFn: () => getPostBySlug(slug),
    ...defaultConfig,
  });
};
