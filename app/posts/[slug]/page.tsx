import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostBody } from "@/components/ui/PostBody";
import { PostCard } from "@/components/ui/PostCard";
import { urlForImage } from "@/lib/sanity/client";
import {
  getPostBundle,
  getPostMeta,
  getPostSlugs,
} from "@/lib/repositories/posts";

export const revalidate = 30;
export const dynamicParams = true;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getPostMeta(slug);
  if (!meta) return {};

  const ogImage = meta.coverImage?.asset?._ref
    ? urlForImage(meta.coverImage).width(1200).height(627).fit("crop").url()
    : undefined;

  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: ogImage
      ? { title: meta.title, description: meta.excerpt, images: [ogImage] }
      : undefined,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { post, morePosts } = await getPostBundle(slug);

  if (!post) notFound();

  return (
    <article>
      <PostBody
        title={post.title}
        content={post.content}
        buttonLink={post.buttonLink}
        buttonName={post.buttonName}
      />

      {morePosts.length > 0 && (
        <section className="bg-gradient-to-b from-gray-800/50 to-gray-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl">
              More stories
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 md:gap-x-4 lg:gap-x-8 gap-y-12 md:gap-y-16 mb-12">
              {morePosts.map((more) => (
                <PostCard key={more._id} post={more} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
