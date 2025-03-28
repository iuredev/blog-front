'use client'

import { useGetPosts } from "@/api/hooks";
import { Loading, PostLink } from "@/components";
import { Profile } from "@/components";
import { Post } from "@/types";
import Link from "next/link";

export default function Home() {


  const { posts, isLoading, isError } = useGetPosts(3);



  const render = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return <div>Ops... something went wrong</div>;
    }

    if (!posts || posts.length === 0) {
      return <div>No posts found</div>
    }

    return (
      posts.map((post: Post) => (
        <PostLink key={post.id} post={post} preview />
      ))
    )
  }

  return (
    <div className="flex flex-col">
      <Profile />

      <div className="mt-8">
        <h1 className="text-xl font-semibold uppercase mb-8">Recent Posts</h1>
        <div className="grid grid-cols-1 ">
          {render()}
        </div>


        <div className="mt-8">
          <Link href="/blog" className="text-blue-500">
            View all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
