/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
import { createClient, type SanityClient } from 'next-sanity'
import { sanityConfig } from './config'

export const sanityClient = createClient(sanityConfig)

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

export const getClient = (preview?: boolean): SanityClient =>
  preview ? previewClient : sanityClient

interface SanityDocument {
  _id?: string
  [key: string]: unknown
}

export function overlayDrafts<T extends SanityDocument>(docs: T[] | null | undefined): T[] {
  const documents = docs || []
  const overlayed = documents.reduce((map, doc) => {
    if (!doc._id) {
      throw new Error('Ensure that `_id` is included in query projection')
    }

    const isDraft = doc._id.startsWith('drafts.')
    const id = isDraft ? doc._id.slice(7) : doc._id
    return isDraft || !map.has(id) ? map.set(id, doc) : map
  }, new Map<string, T>())

  return Array.from(overlayed.values())
}
