import { usePreview } from '../lib/sanity'
import { postQuery } from '../lib/queries'
import Post from './post'

export default function PostPreview({ data }) {
  const slug = data?.post?.slug
  const previewData = usePreview(postQuery, { slug })
  return <Post data={previewData ?? data} preview />
}
