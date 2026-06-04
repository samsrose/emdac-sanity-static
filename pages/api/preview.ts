import type { NextApiRequest, NextApiResponse } from 'next'
import { postBySlugQuery } from '../../lib/queries'
import { previewClient } from '../../lib/sanity.server'

function redirectToPreview(res: NextApiResponse, Location: string): void {
  // Enable Draft Mode by setting the cookie
  res.setDraftMode({ enable: true })
  // Redirect to a preview capable route
  res.writeHead(307, { Location })
  res.end()
}

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET
  // Only require a secret when in production
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new TypeError(`Missing SANITY_STUDIO_PREVIEW_SECRET`)
  }
  // Check the secret if it's provided, enables running preview mode locally before the env var is setup
  if (secret && req.query.secret !== secret) {
    res.status(401).json({ message: 'Invalid secret' })
    return
  }
  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    redirectToPreview(res, '/')
    return
  }

  // Check if the post with the given `slug` exists
  const post = await previewClient.fetch(postBySlugQuery, {
    slug: req.query.slug,
  })

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    res.status(401).json({ message: 'Invalid slug' })
    return
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // redirectToPreview(res, `/posts/${post.slug}`)
  redirectToPreview(res, `/`)
}
