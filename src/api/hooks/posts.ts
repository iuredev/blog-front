import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPostBySlug, getPosts } from "../queries";
import { keys } from "../keys";
import { defaultOptionsReactQuery } from "./utils";
import { Post } from "../../types";

export const useGetPosts = (pageSize: number = 10, page?: number, locale?: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.POSTS, locale],
    queryFn: () => getPosts(pageSize, page, undefined, locale),
    ...defaultOptionsReactQuery,
  });

  return {
    posts: data?.data,
    isLoading,
    isFetching,
    isError,
  };
};

export const useGetPostBySlug = (slug: string, initialData?: Post, locale?: string) => {
  return useQuery({
    queryKey: [keys.POST_BY_SLUG, slug, locale],
    queryFn: () => getPostBySlug(slug, locale),
    initialData,
    ...defaultOptionsReactQuery,
  });
};

export const useGetPostsPaginated = (pageSize: number = 10, page: number, categoryId?: number, locale?: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.POSTS_PAGINATED, page, categoryId, locale],
    queryFn: () => getPosts(pageSize, page, categoryId, locale),
    notifyOnChangeProps: ["data"],
    placeholderData: keepPreviousData,
    ...defaultOptionsReactQuery,
  });

  return {
    posts: data?.data,
    pagination: data?.meta?.pagination,
    isLoading,
    isFetching,
    isError,
  };
};

// weak logic, should be improved (should be a better way to get random posts) by using backend
export const useGetRandomPosts = (currentPostId?: number, locale?: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.POSTS_RELATED, locale],
    queryFn: () => getPosts(50, undefined, undefined, locale),
    ...defaultOptionsReactQuery,
  });

  const pickTreeRandomPosts = () => {
    if (!data?.data?.length) return [];

    const availablePosts = [...data.data];

    if (currentPostId) {
      const currentIndex = availablePosts.findIndex(
        (post) => post.id === currentPostId
      );
      if (currentIndex !== -1) {
        availablePosts.splice(currentIndex, 1);
      }
    }

    if (!availablePosts.length) return [];

    const randomPosts: Post[] = [];
    const numPostsToGet = Math.min(3, availablePosts.length);

    while (randomPosts.length < numPostsToGet) {
      const randomIndex = Math.floor(Math.random() * availablePosts.length);
      const post = availablePosts[randomIndex];

      if (!randomPosts.includes(post)) {
        randomPosts.push(post);
        availablePosts.splice(randomIndex, 1);
      }
    }
    return randomPosts.length > 0 ? randomPosts : [availablePosts[0]];
  };

  const posts = Array.from(new Set(pickTreeRandomPosts())).filter(
    (i) => i !== undefined
  );

  return {
    posts: posts,
    isLoading,
    isFetching,
    isError,
  };
};
