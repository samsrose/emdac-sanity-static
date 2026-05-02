import Link from "next/link";
import { CoverImage } from "./CoverImage";
import { FormattedDate } from "./FormattedDate";
import type { Post } from "@/lib/types/sanity";

interface PostCardProps {
  post: Post;
  priority?: boolean;
  sizes?: string;
}

export function PostCard({ post, priority, sizes }: PostCardProps) {
  return (
    <article className="rounded-md">
      <div className="mb-4">
        <CoverImage
          slug={post.slug}
          title={post.title}
          image={post.coverImage}
          priority={priority}
          sizes={sizes}
        />
      </div>
      {post.date && (
        <p className="text-md text-gray-200">
          <FormattedDate dateString={post.date} />
        </p>
      )}
      <h3 className="text-xl leading-snug text-gray-200">{post.title}</h3>
      <br />
      {post.slug && (
        <Link
          className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-500/90 transition"
          href={`/posts/${post.slug}`}
        >
          {post.buttonName ?? "Learn More"}
        </Link>
      )}
    </article>
  );
}
