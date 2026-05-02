import type { CommitteeCategory, ResourceCategory } from "../types/sanity";

const postFields = `
  _id,
  title,
  date,
  excerpt,
  coverImage,
  buttonLink,
  buttonName,
  "slug": slug.current,
  "author": author->{name, picture}
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    ${postFields}
  }
}`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}`;

export const officersQuery = `
*[_type == "officers"] | order(order asc, name asc) {
  _id, name, role, order
}`;

export const membersQuery = `
*[_type == "members"] | order(lastName asc) {
  _id, firstName, lastName, position, email
}`;

export const associatesQuery = `
*[_type == "associates"] | order(lastName asc) {
  _id, firstName, lastName, position, email
}`;

export const meetingsQuery = `
*[_type == "meetings"] | order(date desc, _updatedAt desc) {
  _id, title, date, location, venue, description, voucherLink, venueLink
}`;

/**
 * One query factory for the six Resource document types. Aliases the
 * type-specific subject field (topic / position / protocol) into a single
 * "subject" projection so the consumer always sees the same shape.
 */
export function resourceQuery(category: ResourceCategory): string {
  const subjectExpr =
    category === "positions"
      ? "position"
      : category === "protocols"
        ? "protocol"
        : "topic";

  return `*[_type == "${category}"] | order(date desc, _updatedAt desc) {
    _id,
    name,
    "subject": ${subjectExpr},
    date,
    "file": file.asset->url,
    link
  }`;
}

/**
 * Factory for the four committee document types, which share an identical
 * shape (just a name + id).
 */
export function committeeQuery(category: CommitteeCategory): string {
  return `*[_type == "${category}"] | order(name asc) { _id, name }`;
}
