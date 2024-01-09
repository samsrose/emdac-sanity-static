import Link from "next/link"
import { meetingsQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server';
import MeetingItem from "../components/MeetingItem";

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function MeetingPage({ allMeetings, preview }) {
  
  const [...moreMeetings] = allMeetings || []

  return (
    <>
      <div className="flex flex-wrap bg-gray-900 lg:w-full sm:mx-auto pt-12 px-2">
        <div className="my-8 max-w-xl pr-4 text-center mx-auto">
          <h2 className="text-5xl lg:text-5xl font-bold text-gray-100 font-heading mb-2">Meetings</h2>
        </div>
      </div>
      <div className="h-screen bg-gray-900 w-full">
        <div className="py-4 px-4 grid mx-auto max-w-7xl">
        <div className='bg-gradient-to-br from-gray-900 to-gray-800 flex align-center justify-center h-full max-w-7xl mx-auto'>
            <div className="divide-y divide-gray-900 overflow-hidden rounded-lg bg-gray-900 shadow sm:grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 sm:gap-4 sm:divide-y-0">
              <MeetingItem data={moreMeetings} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allMeetings = overlayDrafts(await getClient(preview).fetch(meetingsQuery))
  
  return {
    props: { allMeetings, preview },
    // If webhooks isn't setup then attempt to re-generate in 30 second intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
  }
}