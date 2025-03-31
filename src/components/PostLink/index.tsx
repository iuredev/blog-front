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
        {post.category && `${post.category.name} •`}{" "}
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
