import { useGetPostsPaginated } from "../../api/hooks";
import { useState } from "react";
import { Error, Loading, PostLink } from "../../components";
import Pagination from "../../components/Pagination";
import { useHelmet } from "../../hooks";
import EmptyPosts from "../EmptyPosts";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts = [], pagination, isLoading, isError } = useGetPostsPaginated(10, currentPage);

  useHelmet("Blog", "Blog - Iure.dev");

  const render = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return <Error />;
    }

    if (posts.length === 0) {
      <EmptyPosts />
    }


    return (
      posts.map((post) => (
        <PostLink key={post.id} post={post} preview={false} />
      ))
    )

  }


  return (
    <div>
      <div >
        <h1 className="text-4xl font-bold ">Blog</h1>
        <p className="text-gray-400">This is where I write about things that interest me. Enjoy reading it! 🙂</p>
      </div>


      <div className="mt-8">
        {render()}
        <Pagination totalPages={pagination && pagination?.pageCount || 1} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}
