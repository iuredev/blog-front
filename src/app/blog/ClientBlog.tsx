'use client'

import { useGetPostsPaginated } from "@/api/hooks";
import { PostLink, Error, Loading, Pagination } from "@/components";
import { Post } from "@/types";
import { useState } from "react";

export default function ClientBlog() {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts = [], pagination, isLoading, isError } = useGetPostsPaginated(10, currentPage);

  const render = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return <Error />;
    }

    if (posts.length === 0) {
      return <div>No posts found</div>
    }

    return (
      posts.map((post: Post) => (
        <PostLink key={post.id} post={post} preview={false} />
      ))
    )
  }

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-gray-400">This is where I write about things that interest me. Enjoy reading it! 🙂</p>
      </div>

      <div className="mt-8">
        {render()}
        <Pagination
          totalPages={pagination && pagination?.pageCount || 1}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
} 