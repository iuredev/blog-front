import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPostBySlug, getPosts } from "../queries";
import { keys } from "../keys";
import { defaultOptionsReactQuery } from "./utils";
import { Post } from "../../types";

export const useGetPosts = (pageSize: number = 10, page?: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.POSTS],
    queryFn: () => getPosts(pageSize, page),
    ...defaultOptionsReactQuery,
  });

  return {
    posts: data && data?.data,
    isLoading,
    isFetching,
    isError,
  };
};

export const useGetPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: [keys.POST_BY_SLUG, slug],
    queryFn: () => getPostBySlug(slug),
    ...defaultOptionsReactQuery,
  });
};

export const useGetPostsPaginated = (pageSize: number = 10, page: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.POSTS_PAGINATED, page],
    queryFn: () => getPosts(pageSize, page),
    notifyOnChangeProps: ["data"],
    placeholderData: keepPreviousData,
    ...defaultOptionsReactQuery,
  });

  return {
    posts: data && data?.data,
    pagination: data && data?.meta?.pagination,
    isLoading,
    isFetching,
    isError,
  };
};

// weak logic, should be improved (should be a better way to get random posts) by using backend
export const useGetRandomPosts = (currentPostId?: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.POSTS_RELATED],
    queryFn: () => getPosts(1000),
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
