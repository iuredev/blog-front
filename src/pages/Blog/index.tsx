import { Link } from "react-router";
// import { useHelmet } from "../../hooks";

export default function Blog() {

  const mockData = [
    {
      id: 1,
      title: "My First Post",
      created_at: "2023-08-01",
      category: "Technology",
      content:
        "This is the content for my first post. It's not very long, but it's a start.",
    },
    {
      id: 2,
      title: "My Second Post",
      created_at: "2023-08-02",
      category: "Lifestyle",
      content:
        "This is the content for my second post. It's not very long, but it's a start.",
    },
    {
      id: 3,
      title: "My Third Post",
      created_at: "2023-08-03",
      category: "Travel",
      content:
        "This is the content for my third post. It's not very long, but it's a start.",
    },
  ];

  // const helmet = useHelmet("Blog", "This is where I write about things that interest me");

  return (
    <div className="py-8">
      {/* {helmet} */}
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p>This is where I write about things that interest me</p>

      <div className="mt-8">
        {mockData.map((post) => (
          <div key={post.id} className="my-4">
            <div className="text-xl font-semibold block">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </div>
            <span className="text-gray-400 text-sm">
              {post.created_at} • {post.category}
            </span>
            <p className="line-clamp-2 text-ellipsis text-gray-400">
              {post.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
