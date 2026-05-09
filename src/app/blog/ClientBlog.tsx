'use client'

import React from "react";
import { useGetPostsPaginated } from "@/api/hooks";
import { useGetCategories } from "@/api/hooks/categories";
import { PostLink, Error, Loading, Pagination } from "@/components";
import { Post } from "@/types";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const VISIBLE_COUNT = 5;

export default function ClientBlog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const pageParam = searchParams.get("page");
  const selectedCategory = categoryParam ? Number(categoryParam) : undefined;
  const currentPage = pageParam ? Number(pageParam) : 1;

  const [showAll, setShowAll] = useState(false);

  const { posts = [], pagination, isLoading, isError } = useGetPostsPaginated(10, currentPage, selectedCategory);
  const { categories } = useGetCategories();

  const visibleCategories = showAll ? categories : categories.slice(0, VISIBLE_COUNT);
  const hasMore = categories.length > VISIBLE_COUNT;

  const updateParams = (categoryId: number | undefined, page: number) => {
    const params = new URLSearchParams();
    if (categoryId !== undefined) params.set("category", String(categoryId));
    if (page > 1) params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategoryClick = (id: number | undefined) => {
    updateParams(id, 1);
  };

  const handlePageChange: React.Dispatch<React.SetStateAction<number>> = (value) => {
    const page = typeof value === "function" ? value(currentPage) : value;
    updateParams(selectedCategory, page);
  };

  const pillClass = (active: boolean) =>
    `text-sm px-3 py-1 rounded-full border transition-colors ${
      active
        ? "border-gray-400 text-gray-200"
        : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-400"
    }`;

  const render = () => {
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (posts.length === 0) return <div>No posts found</div>;

    return posts.map((post: Post) => (
      <PostLink key={post.id} post={post} preview={false} />
    ));
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-gray-400">This is where I write about things that interest me. Enjoy reading it! 🙂</p>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          <button onClick={() => handleCategoryClick(undefined)} className={pillClass(selectedCategory === undefined)}>
            All
          </button>
          {visibleCategories.map((cat) => (
            <button key={cat.id} onClick={() => handleCategoryClick(cat.id)} className={pillClass(selectedCategory === cat.id)}>
              {cat.name}
            </button>
          ))}
          {hasMore && (
            <button onClick={() => setShowAll((v) => !v)} className={pillClass(false)}>
              {showAll ? "less" : `+${categories.length - VISIBLE_COUNT} more`}
            </button>
          )}
        </div>
      )}

      <div className="mt-8">
        {render()}
        <Pagination
          totalPages={pagination?.pageCount || 1}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      </div>
    </div>
  );
}
