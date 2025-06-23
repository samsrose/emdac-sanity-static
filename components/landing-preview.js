import { usePreview } from '../lib/sanity'
import { indexQuery } from '../lib/queries'
import Landing from './landing'

export default function LandingPreview({ allPosts }) {
  const previewAllPosts = usePreview(indexQuery)
  return <Landing allPosts={previewAllPosts ?? allPosts} preview />
}
