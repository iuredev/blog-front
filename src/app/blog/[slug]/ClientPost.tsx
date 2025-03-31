"use client";

import { useGetPostBySlug, useGetRandomPosts } from "@/api/hooks";
import { Error, Loading, Markdown, PostLink } from "@/components";
import ShareSocialMedia from "@/components/ShareSocialMedia";
import { formatDate, minutesToRead } from "@/utils";
import Script from "next/script";

export default function ClientPost({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useGetPostBySlug(slug);
  const { posts } = useGetRandomPosts(!isLoading ? data?.id : undefined);

  const jsonLd = data
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.title,
        datePublished: data.publishedAt,
        dateCreated: data.createdAt,
        dateModified: data.updatedAt || data.publishedAt,
        author: {
          "@type": "Person",
          name: "Iure",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://iure.dev/blog/${slug}`,
        },
        description: data.content.substring(0, 160),
        articleSection: data.category?.name || "Blog",
      }
    : null;

  const render = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return <Error />;
    }

    if (data) {
      return (
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">{data?.title}</h1>
          <p className="flex items-center gap-2 text-gray-400">
            {formatDate(data.createdAt)} •{" "}
            {data.category && `${data.category.name} •`}
            {minutesToRead(data.content)}
          </p>
          <ShareSocialMedia
            url={`${window.location.origin}/blog/${data.slug}`}
          />
          <div className="content grid grid-cols-1 mt-6 text-base md:text-[1.05rem]">
            <Markdown content={data.content} />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {data && (
        <Script
          id="blog-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {render()}

      {!isLoading && !isError && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold">Other posts</h2>
          {posts.length > 0 &&
            posts.map((post) => (
              <PostLink key={post.id} post={post} preview={false} />
            ))}
        </div>
      )}
    </div>
  );
}
