import { useParams } from "react-router";
import "tailwindcss/tailwind.css";
import { Error, Loading, Markdown, PostLink } from "../../components";
import { formatDate, minutesToRead } from "../../utils";
import { useGetPostBySlug, useGetRandomPosts } from "../../api/hooks";
import useHelmet from "../../hooks";
import { FaLinkedin } from "react-icons/fa6";
import { useCallback } from "react";


export default function Post() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, } = useGetPostBySlug(slug as string);

  const { posts } = useGetRandomPosts(!isLoading ? data?.id : undefined);


  useHelmet(isLoading ? "Iure.dev" : data?.title || "Iure.dev", data?.description || "");

  const handleShareLinkedin = useCallback(() => {

    const url = window.location.href;
    const title = data?.title;
    const description = data?.description;
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&description=${description}&source=Iure.dev`;

    console.log("title", title);
    console.log("description", description);

    window.open(linkedinUrl, '_blank');

  }, [data?.title, data?.description]);


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
          <p className="flex items-center gap-2 mb-4 text-gray-400">{formatDate(data?.publishedAt)} • {data.category && `${data.category.name} •`}
            {minutesToRead(data?.content)}
            <button className="text-gray-400 hover:text-gray-600" onClick={handleShareLinkedin} aria-label="Share on LinkedIn" title="Share on LinkedIn">
              <FaLinkedin className="h-4 w-4 text-gray-300" />
            </button></p>
          <div className="content grid grid-cols-1 mt-6 text-base md:text-[1.05rem]">
            <Markdown content={data.content} />
          </div>
        </div>
      );
    }

    return null;
  };


  return (
    <div className="flex flex-col ">
      {render()}


      {!isLoading && !isError && (<div className="mt-16">
        <h2 className="text-2xl font-bold">Other posts</h2>
        {posts.length > 0 && posts.map((post) => (
          <PostLink key={post.id} post={post} preview={false} />
        ))}
      </div>)}

    </div>
  );
}
