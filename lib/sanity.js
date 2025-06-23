import createImageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'
import { sanityConfig } from './config'
import { useEffect, useState } from 'react'

export const client = createClient(sanityConfig)

export const imageBuilder = createImageUrlBuilder(sanityConfig)

export const urlForImage = (source) =>
  imageBuilder.image(source).auto('format').fit('max')

// Create preview client
export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

// Preview hook for the latest version
export const usePreview = (query, params) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      previewClient.fetch(query, params).then(setData).finally(() => setLoading(false))
    }
  }, [query, JSON.stringify(params)])

  return loading ? null : data
}
