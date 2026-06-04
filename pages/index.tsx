import type { GetStaticProps } from 'next'
import { indexQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Landing from '../components/landing'
import Footer from "../components/Footer";
import type { Post } from '../lib/types'

interface IndexPageProps {
  allPosts: Post[]
  preview: boolean
}

export default function IndexPage({ allPosts, preview }: IndexPageProps) {
  return <Landing allPosts={allPosts} />
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async ({ preview = false }) => {
  const allPosts: Post[] = overlayDrafts(await getClient(preview).fetch(indexQuery))
  return {
    props: { allPosts, preview },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
  }
}
