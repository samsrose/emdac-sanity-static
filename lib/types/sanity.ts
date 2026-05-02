import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImageRef {
  asset?: { _ref?: string; _type?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanityFile {
  asset?: { _ref?: string; _type?: string; url?: string };
}

export interface Author {
  _id: string;
  name: string;
  picture?: SanityImageRef;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  excerpt?: string;
  buttonLink?: string;
  buttonName?: string;
  content?: PortableTextBlock[];
  coverImage?: SanityImageRef;
  author?: Pick<Author, "name" | "picture">;
}

export interface PostBundle {
  post: Post | null;
  morePosts: Post[];
}

export interface Officer {
  _id: string;
  name: string;
  role: string;
  order?: string | number;
}

export interface CommitteeMember {
  _id: string;
  name: string;
}

export interface DirectoryPerson {
  _id: string;
  firstName: string;
  lastName: string;
  position?: string;
  email?: string;
}

export interface Meeting {
  _id: string;
  title: string;
  date: string;
  location?: string;
  venue?: string;
  description?: string;
  voucherLink?: string;
  venueLink?: string;
}

/**
 * Resource shape covers documents, evidence, legislative, minutes,
 * positions, and protocols. Every variant has name + date + (file|link),
 * with a single optional "subject" string field that maps to whichever
 * type-specific field exists upstream (topic, position, protocol).
 */
export interface Resource {
  _id: string;
  name: string;
  subject?: string;
  date: string;
  file?: string;
  link?: string;
}

export type ResourceCategory =
  | "documents"
  | "evidence"
  | "legislative"
  | "minutes"
  | "positions"
  | "protocols";

export interface ResourceCategoryConfig {
  category: ResourceCategory;
  title: string;
  subjectLabel: string;
}

export type CommitteeCategory =
  | "scopeofpractice"
  | "legislativec"
  | "medicaladvisory"
  | "nominating";

/**
 * Bundle returned by the composite /committees query — officers plus the
 * roster for each committee category, fetched in a single round trip.
 */
export interface CommitteesPageData {
  officers: Officer[];
  scopeofpractice: CommitteeMember[];
  legislativec: CommitteeMember[];
  medicaladvisory: CommitteeMember[];
  nominating: CommitteeMember[];
}

/**
 * Bundle returned by the composite /directory query.
 */
export interface DirectoryPageData {
  members: DirectoryPerson[];
  associates: DirectoryPerson[];
}

/**
 * Bundle returned by the composite /documents query — one entry per
 * resource category, all six fetched in a single round trip.
 */
export type DocumentsPageData = Record<ResourceCategory, Resource[]>;

/**
 * Lean projection used by `generateMetadata` for `/posts/[slug]`. Drops
 * the portable-text body, slug, dates, author, and CTA fields that never
 * appear in <head>.
 */
export interface PostMeta {
  title: string;
  excerpt?: string;
  coverImage?: SanityImageRef;
}
