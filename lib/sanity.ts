import createImageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { createClient, type QueryParams } from 'next-sanity'
import { useEffect, useState } from 'react'
import { sanityConfig } from './config'

export const client = createClient(sanityConfig)

export const imageBuilder = createImageUrlBuilder(sanityConfig)

export const urlForImage = (source: SanityImageSource): ImageUrlBuilder =>
  imageBuilder.image(source).auto('format').fit('max')

// Create preview client
export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

// Preview hook for the latest version
export const usePreview = <T = unknown>(
  query: string | null,
  params: QueryParams = {}
): T | null => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      previewClient
        .fetch<T>(query, params)
        .then(setData)
        .finally(() => setLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params)])

  return loading ? null : data
}
