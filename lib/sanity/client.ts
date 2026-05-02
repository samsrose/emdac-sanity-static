import createImageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { sanityConfig } from "./config";
import type { SanityImageRef } from "../types/sanity";

/**
 * Public, read-only Sanity client.
 *
 * Safe to import from server or client components. Never carries a token.
 * Used for content that is publicly cacheable.
 */
export const sanityClient = createClient(sanityConfig);

const imageBuilder = createImageUrlBuilder(sanityConfig);

export function urlForImage(source: SanityImageRef) {
  return imageBuilder.image(source).auto("format").fit("max");
}
