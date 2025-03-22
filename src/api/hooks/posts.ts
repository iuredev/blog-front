import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPostBySlug, getPosts } from "../queries";
import { keys } from "../keys";
import { defaultOptionsReactQuery } from "./utils";

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

// weak logic, should be improved (should be a better way to get random posts)
export const useGetRandomPosts = (currentPostId?: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [keys.POSTS_RELATED],
    queryFn: () => getPosts(1000),
    ...defaultOptionsReactQuery,
  });

  const pickTreeRandomPosts = () => {
    const randomPosts = [];

    if (data) {
      if (currentPostId) {
        const currentIndex = data?.data.findIndex(
          (post) => post.id === currentPostId
        );

        if (currentIndex !== -1) {
          data?.data.splice(currentIndex, 1);
        }
      }

      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * data?.data.length);
        randomPosts.push(data?.data[randomIndex]);
      }
    }
    return randomPosts;
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
