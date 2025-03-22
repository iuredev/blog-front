import { useParams } from "react-router";
import "tailwindcss/tailwind.css";
import { Error, Loading, Markdown, PostLink } from "../../components";
import { formatDate, minutesToRead } from "../../utils";
import { useGetPostBySlug, useGetRandomPosts } from "../../api/hooks";
import useHelmet from "../../hooks";


export default function Post() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, } = useGetPostBySlug(slug as string);

  const { posts } = useGetRandomPosts(!isLoading ? data?.id : undefined);


  useHelmet(isLoading ? "Iure.dev" : data?.title || "Iure.dev", data?.description || "");

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
          <p className="mb-4 text-gray-400">{formatDate(data?.publishedAt)} • {data.category && `${data.category.name} •`} {minutesToRead(data?.content)}</p>
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
