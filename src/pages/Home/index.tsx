import { Link } from "react-router";
import { Profile } from "../../components";

const mockData = [
  {
    id: 1,
    title: "Post 1",
    category: "Tech",
    created_at: "2021-09-01",
    content:
      "This is the content for post 1This is the content for post 1This is the content for post 1This is the content for post 1This is the content for post 1This is the content for post 1This is the content for post 1This is the content for post 1 ",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is the content for post 2",
    category: "Tech",

    created_at: "2021-09-01",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is the content for post 3",
    category: "Tech",
    created_at: "2021-09-01",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Profile />

      <div className="mt-8">
        <h1 className="text-xl font-semibold uppercase">Recent Posts</h1>

        <div className="mt-8">
          {mockData.map((post) => (
            <div key={post.id} className="my-4">
              <div className="text-xl font-semibold block">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </div>
              <span className="text-gray-300 text-md">
                {post.created_at} • {post.category}
              </span>
              <p className="line-clamp-2 text-ellipsis text-gray-400">
                {post.content}
              </p>
            </div>
          ))}

          <div className="mt-8">
            <Link to="/blog" className="text-blue-500">
              View all posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
