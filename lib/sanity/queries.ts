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

/**
 * Slim projection for `generateMetadata` — drops the portable-text body and
 * author so we don't pay for fields that never appear in <head>.
 */
export const postMetaQuery = `
*[_type == "post" && slug.current == $slug][0] {
  title, excerpt, coverImage
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

/**
 * Composite query for the /committees route. Returns officers and the four
 * committee rosters in a single round trip.
 */
export const committeesPageQuery = `{
  "officers": *[_type == "officers"] | order(order asc, name asc) {
    _id, name, role, order
  },
  "scopeofpractice": *[_type == "scopeofpractice"] | order(name asc) { _id, name },
  "legislativec":    *[_type == "legislativec"]    | order(name asc) { _id, name },
  "medicaladvisory": *[_type == "medicaladvisory"] | order(name asc) { _id, name },
  "nominating":      *[_type == "nominating"]      | order(name asc) { _id, name }
}`;

/**
 * Composite query for the /directory route.
 */
export const directoryPageQuery = `{
  "members": *[_type == "members"] | order(lastName asc) {
    _id, firstName, lastName, position, email
  },
  "associates": *[_type == "associates"] | order(lastName asc) {
    _id, firstName, lastName, position, email
  }
}`;

/**
 * Composite query for the /documents route. Aliases each type-specific
 * subject field (topic / position / protocol) into a single "subject"
 * projection so the consumer always sees the same shape.
 */
export const documentsPageQuery = `{
  "documents":   *[_type == "documents"]   | order(date desc, _updatedAt desc) { _id, name, "subject": topic,    date, "file": file.asset->url, link },
  "evidence":    *[_type == "evidence"]    | order(date desc, _updatedAt desc) { _id, name, "subject": topic,    date, "file": file.asset->url, link },
  "legislative": *[_type == "legislative"] | order(date desc, _updatedAt desc) { _id, name, "subject": topic,    date, "file": file.asset->url, link },
  "minutes":     *[_type == "minutes"]     | order(date desc, _updatedAt desc) { _id, name, "subject": topic,    date, "file": file.asset->url, link },
  "positions":   *[_type == "positions"]   | order(date desc, _updatedAt desc) { _id, name, "subject": position, date, "file": file.asset->url, link },
  "protocols":   *[_type == "protocols"]   | order(date desc, _updatedAt desc) { _id, name, "subject": protocol, date, "file": file.asset->url, link }
}`;
