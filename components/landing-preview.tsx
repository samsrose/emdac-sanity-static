import { usePreview } from '../lib/sanity'
import { indexQuery } from '../lib/queries'
import Landing from './landing'
import { Post } from '../lib/types'

interface LandingPreviewProps {
  allPosts: Post[]
}

export default function LandingPreview({ allPosts }: LandingPreviewProps) {
  const previewAllPosts = usePreview<Post[]>(indexQuery)
  return <Landing allPosts={previewAllPosts ?? allPosts} preview />
}
