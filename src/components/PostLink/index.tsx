import Link from "next/link";
import { Post } from "../../types";
import { formatDate, minutesToRead } from "../../utils";
import Markdown from "../Markdown";

interface PostProps {
  post: Post;
  preview: boolean;
}
export default function PostLink({ post, preview }: PostProps) {
  return (
    <div key={post.id} className="my-4 gap-16 width-full">
      <div className="text-xl font-semibold block">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </div>
      <span className="text-gray-300 text-base">
        {formatDate(post.createdAt)} •{" "}
        {post.categories?.length > 0 && (
          <>
            <span className="relative inline-block group">
              <span className="cursor-default">{post.categories[0].name}</span>
              {post.categories.length > 1 && (
                <span className="absolute bottom-full left-0 mb-1 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none transition-opacity">
                  {post.categories.slice(1).map((c) => c.name).join(", ")}
                </span>
              )}
            </span>
            {" •"}{" "}
          </>
        )}
        {minutesToRead(post.content)}
      </span>

      {preview && (
        <div className="text-sm line-clamp-2 text-ellipsis text-gray-400">
          <Markdown content={post.content} />
        </div>
      )}
    </div>
  );
}
