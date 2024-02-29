const postFields = `
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  buttonLink,
  buttonName,
  "slug": slug.current,
  "author": author->{name, picture},
`

const officersFields = `
_id,
name,
role,
order
`

const committeeFields = `
_id,
name,
`

const membersFields = `
  _id,
  firstName,
  lastName,
  position,
  email,
`

const associatesFields = `
  _id,
  firstName,
  lastName,
  position,
  email,
`

const documentsFields = `
_id,
name,
topic,
date,
"file": file.asset->url
`

const evidenceFields = `
_id,
name,
topic,
date,
"file": file.asset->url
`

const legislativeFields = `
_id,
name,
topic,
date,
"file": file.asset->url
`

const meetingsFields = `
_id,
title,
date,
location,
venue,
description,
voucherLink,
venueLink
`

const minutesFields = `
_id,
name,
venue,
date,
minutes
`

const positionsFields = `
_id,
name,
position,
date,
"file": file.asset->url
`

const protocolsFields = `
_id,
name,
protocol,
date,
"file": file.asset->url
`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

// ******************
// * index          *
// ******************

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`


// ******************
// * Officers       *
// ******************

export const officersQuery = `
*[_type == "officers"] | order(name desc, _updatedAt desc) {
  ${officersFields}
}`

// **********************
// * Scope of Pracitce  *
// **********************

export const scopeofpracticeQuery = `
*[_type == "scopeofpractice"] | order(name desc, _updatedAt desc) {
  ${committeeFields}
}`

// ******************
// * Legislative    *
// ******************

export const legislativecQuery = `
*[_type == "legislativec"] | order(name desc, _updatedAt desc) {
  ${committeeFields}
}`

// *********************
// * Medical Advisory  *
// *********************

export const advisoryQuery = `
*[_type == "medicaladvisory"] | order(name desc, _updatedAt desc) {
  ${committeeFields}
}`

// ******************
// * Nominating     *
// ******************

export const nominatingQuery = `
*[_type == "nominating"] | order(name desc, _updatedAt desc) {
  ${committeeFields}
}`

// ******************
// * members        *
// ******************

export const membersQuery = `
*[_type == "members"] | order(lastName asc, isAssociate desc) {
  ${membersFields}
}`

// ******************
// * associates     *
// ******************

export const associatesQuery = `
*[_type == "associates"] | order(lastName asc, isAssociate desc) {
  ${associatesFields}
}`

// ******************
// * documents      *
// ******************

export const documentsQuery = `
*[_type == "documents"] | order(name desc, _updatedAt desc) {
  ${documentsFields}
}`

// ******************
// * evidence       *
// ******************

export const evidenceQuery = `
*[_type == "evidence"] | order(name desc, _updatedAt desc) {
  ${evidenceFields}
}`

// ******************
// * legislative    *
// ******************

export const legislativeQuery = `
*[_type == "legislative"] | order(name desc, _updatedAt desc) {
  ${legislativeFields}
}`

// ******************
// * meetings       *
// ******************

export const meetingsQuery = `
*[_type == "meetings"] | order(date desc, _updatedAt desc) {
  ${meetingsFields}
}`

// ******************
// * minutes        *
// ******************

export const minutesQuery = `
*[_type == "minutes"] | order(date desc, _updatedAt desc) {
  ${minutesFields}
}`

// ******************
// * positions      *
// ******************

export const positionsQuery = `
*[_type == "positions"] | order(date desc, _updatedAt desc) {
  ${positionsFields}
}`

// ******************
// * protocols      *
// ******************

export const protocolsQuery = `
*[_type == "protocols"] | order(date desc, _updatedAt desc) {
  ${protocolsFields}
}`