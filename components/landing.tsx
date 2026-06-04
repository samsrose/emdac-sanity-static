import Layout from './Layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import HeroPost from './hero-post'
import MoreStories from './more-stories'
import HeaderSection from './HeaderSection'
import { Post } from '../lib/types'

interface LandingProps {
  allPosts?: Post[]
  preview?: boolean
}

export default function Landing({ allPosts, preview }: LandingProps) {
  const [...morePosts] = allPosts || []
  // const [heroPost, ...morePosts] = allPosts || []
  return (
    <>
      <Layout preview={preview}>
        <>
          <HeaderSection />
          {morePosts.length > 0 && <MoreStories posts={morePosts} buttonLink={(allPosts! as Post[] & { buttonLink?: string }).buttonLink} />}
        </>
      </Layout>
    </>
  )
}
