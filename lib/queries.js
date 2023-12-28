const postFields = `
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

const committeesFields = `
_id,
name,
subcommittee,
role
`

const subcommitteeFields = `
_id,
name,
`

const directoryFields = `
  _id,
  firstName,
  lastName,
  email,
  isAssociate,
`

const documentsFields = `
_id,
name,
topic,
date,
file
`

const evidenceFields = `
_id,
name,
topic,
date,
file
`

const legislativeFields = `
_id,
name,
topic,
date,
file
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

const positionsFields = `
_id,
name,
position,
date,
file
`

const protocolsFields = `
_id,
name,
protocol,
date,
file
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
// * committees     *
// ******************

export const committeesQuery = `
*[_type == "committees"] | order(subcommittee desc, _updatedAt desc) {
  ${committeesFields}
}`

// ******************
// * subcommittees  *
// ******************

export const subcommitteeQuery = `
*[_type == "subcommittees"] | order(name desc, _updatedAt desc) {
  ${subcommitteeFields}
}`

// ******************
// * directory      *
// ******************

export const directoryQuery = `
*[_type == "directory"] | order(lastName desc, isAssociate desc) {
  ${directoryFields}
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