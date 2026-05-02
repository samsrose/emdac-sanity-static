import "server-only";
import { sanityClient } from "../sanity/client";
import { getClient, overlayDrafts } from "../sanity/server";
import { indexQuery, postQuery, postSlugsQuery } from "../sanity/queries";
import type { Post, PostBundle } from "../types/sanity";
import type { ReadOptions } from "./types";

export async function getAllPosts({ preview = false }: ReadOptions = {}): Promise<Post[]> {
  const posts = await getClient(preview).fetch<Post[]>(indexQuery);
  return overlayDrafts(posts);
}

export async function getPostBundle(
  slug: string,
  { preview = false }: ReadOptions = {},
): Promise<PostBundle> {
  const data = await getClient(preview).fetch<PostBundle>(postQuery, { slug });
  return {
    post: data.post ?? null,
    morePosts: overlayDrafts(data.morePosts),
  };
}

export async function getPostSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(postSlugsQuery);
}
