import "server-only";
import { createClient } from "next-sanity";
import { sanityConfig } from "./config";
import { sanityClient } from "./client";

/**
 * Preview/draft client. Reads the read token from the server environment
 * and bypasses the CDN so editors see fresh drafts.
 *
 * The `import "server-only"` at the top throws at build time if any
 * client component accidentally imports this module.
 */
export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
});

export function getClient(preview = false) {
  return preview ? previewClient : sanityClient;
}

interface DraftAware {
  _id: string;
}

/**
 * Collapses Sanity draft + published pairs into a single document, preferring
 * the draft when both exist. Mirrors the legacy helper but with strict types.
 */
export function overlayDrafts<T extends DraftAware>(docs: T[] | null | undefined): T[] {
  const documents = docs ?? [];
  const overlayed = documents.reduce<Map<string, T>>((map, doc) => {
    if (!doc._id) {
      throw new Error("Ensure that `_id` is included in query projection");
    }
    const isDraft = doc._id.startsWith("drafts.");
    const id = isDraft ? doc._id.slice("drafts.".length) : doc._id;
    if (isDraft || !map.has(id)) map.set(id, doc);
    return map;
  }, new Map());
  return Array.from(overlayed.values());
}
