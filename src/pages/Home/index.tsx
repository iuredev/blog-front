import { Link } from "react-router";
import { Loading, PostLink, Profile } from "../../components";
import { useGetPosts } from "../../api/hooks";
import { useHelmet } from "../../hooks";
import EmptyPosts from "../EmptyPosts";

export default function Home() {
  const { posts, isLoading, isError } = useGetPosts(3);
  useHelmet(
    "Iure.dev",
    "Personal blog of Iure - Software Engineer sharing thoughts on technology, lifestyle, tutorials and personal development."
  );

  const render = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return <div>Ops... something went wrong</div>;
    }

    if (!posts || posts.length === 0) {
      return <EmptyPosts />;
    }

    return posts.map((post) => <PostLink key={post.id} post={post} preview />);
  };

  return (
    <div className="flex flex-col">
      <Profile />

      <div className="mt-8">
        <h1 className="text-xl font-semibold uppercase mb-8">Recent Posts</h1>
        <div className="grid grid-cols-1 ">{render()}</div>

        <div className="mt-8">
          <Link to="/blog" className="text-blue-500">
            View all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
