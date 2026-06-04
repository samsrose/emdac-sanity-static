import { usePreview } from '../lib/sanity'
import { postQuery } from '../lib/queries'
import Post from './post'
import { PostData } from '../lib/types'

interface PostPreviewProps {
  data: PostData
}

export default function PostPreview({ data }: PostPreviewProps) {
  const slug = data?.post?.slug
  const previewData = usePreview(postQuery, { slug })
  return <Post data={previewData ?? data} preview />
}
