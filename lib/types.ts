/**
 * Shared domain types for content returned by Sanity.
 *
 * These interfaces model the projections defined in `lib/queries.ts`.
 * Most fields are optional because GROQ may return partial documents and
 * draft content while editing in the Studio.
 */

/** A raw Sanity image reference (as stored on a document). */
export interface SanityImageSource {
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  [key: string]: unknown;
}

/** A Sanity slug object. In queries we usually project `"slug": slug.current`. */
export interface SanitySlug {
  _type?: "slug";
  current?: string;
}

export interface Author {
  name?: string;
  picture?: SanityImageSource;
}

/** Portable Text / block content is loosely typed as an array of blocks. */
export type PortableTextBlocks = unknown[];

export interface Post {
  _id?: string;
  name?: string;
  title?: string;
  date?: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  buttonLink?: string;
  buttonName?: string;
  slug?: string;
  author?: Author;
  content?: PortableTextBlocks;
}

export interface PostData {
  post?: Post;
  morePosts?: Post[];
}

export interface Officer {
  _id?: string;
  name?: string;
  role?: string;
  order?: number;
}

export interface Committee {
  _id?: string;
  name?: string;
}

export interface Member {
  _id?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  email?: string;
  isAssociate?: boolean;
}

export type Associate = Member;

/** Documents, evidence and legislative records share the same projection. */
export interface FileRecord {
  _id?: string;
  name?: string;
  topic?: string;
  date?: string;
  file?: string;
}

export type DocumentRecord = FileRecord;
export type EvidenceRecord = FileRecord;
export type LegislativeRecord = FileRecord;

export interface Meeting {
  _id?: string;
  title?: string;
  date?: string;
  location?: string;
  venue?: string;
  description?: string;
  voucherLink?: string;
  venueLink?: string;
}

export interface Minute {
  _id?: string;
  name?: string;
  venue?: string;
  date?: string;
  minutes?: string;
}

export interface Position {
  _id?: string;
  name?: string;
  position?: string;
  date?: string;
  file?: string;
}

export interface Protocol {
  _id?: string;
  name?: string;
  protocol?: string;
  date?: string;
  file?: string;
}
