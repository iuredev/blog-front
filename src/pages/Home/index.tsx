import { Link } from "react-router";
import { Markdown, Profile } from "../../components";
import { useGetPosts } from "../../api/hooks";
import { formatDate, minutesToRead } from "../../utils";



export default function Home() {

 const { data , isLoading } = useGetPosts(3);





  return (
    <div className="flex flex-col">
      <Profile />

      <div className="mt-8">
        <h1 className="text-xl font-semibold uppercase">Recent Posts</h1>

          {isLoading ? (
            <div className="mt-8">
            <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          ) : (
            <div className="mt-8">
          {data?.data.map((post) => (
            <div key={post.id} className="my-4">
              <div className="text-xl font-semibold block">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </div>
              <span className="text-gray-300 text-md">
                {formatDate(post.publishedAt)} • {post.category && `${post.category.name} •`}  {minutesToRead(post.body)}
              </span>
              <div className="text-sm line-clamp-2 text-ellipsis text-gray-400">
               <Markdown content={post.body} />
              </div>
            </div>
          ))}

          <div className="mt-8">
            <Link to="/blog" className="text-blue-500">
              View all posts
            </Link>
          </div>
        </div>
          )}
        
      </div>
    </div>
  );
}
