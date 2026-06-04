import type { GetStaticPaths, GetStaticProps } from 'next'
import { postQuery, postSlugsQuery } from '../../lib/queries'
import { getClient, overlayDrafts, sanityClient } from '../../lib/sanity.server'
import Post from '../../components/post'
import type { PostData } from '../../lib/types'

interface PostPageProps {
  preview: boolean
  data: PostData
}

export default function PostPage({ preview, data }: PostPageProps) {
  return <Post data={data} />
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params, preview = false }) => {
  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug: params?.slug as string,
  })

  const data: PostData = {
    post,
    morePosts: overlayDrafts(morePosts),
  }

  return {
    props: {
      preview,
      data,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch<string[]>(postSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
