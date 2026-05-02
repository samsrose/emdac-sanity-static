export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gx8gnj1q";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-18";

/**
 * Use the Sanity CDN in production for faster reads. App Router pages all
 * fetch from the server, so the CDN benefits are realized server-side too.
 * Preview/draft reads bypass the CDN (configured separately in server.ts).
 */
export const sanityConfig: SanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
};
