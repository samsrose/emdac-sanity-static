import Link from "next/link"
// import { useEffect, useState } from 'react'
// import { usePreviewSubscription } from '../util/lib/sanity';
// import { getClient, overlayDrafts } from '../util/lib/sanity.server';
// import MeetingItem from "../components/MeetingItem";



// function MeetingPage({ allMeetings: initialAllMeetings, preview }) {
//   const { data: allMeetings } = usePreviewSubscription(Meeting_indexQuery, {
//     initialData: initialAllMeetings,
//     enabled: preview,
//   })
//   const [...moreMeetings] = allMeetings || []

//   return (
//     <>
//       <div className="flex flex-wrap bg-gray-900 lg:w-full sm:mx-auto pt-12 px-2">
//         <div className="my-8 max-w-xl pr-4 text-center mx-auto">
//           <h2 className="text-5xl lg:text-5xl font-bold text-gray-100 font-heading mb-2">Meetings</h2>
//         </div>
//       </div>
//       <div className="h-screen bg-gray-900 w-full">
//         <div className="py-6 px-8 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-7xl">
//             <MeetingItem data={...moreMeetings} />
//         </div>
//       </div>
//     </>
//   )
// }

// export async function getStaticProps({ preview = false }) {
//   const allMeetings = overlayDrafts(await getClient(preview).fetch(Meeting_indexQuery))
  
//   return {
//     props: { allMeetings, preview },
//     // If webhooks isn't setup then attempt to re-generate in 30 second intervals
//     revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
//   }
// }

// export default MeetingPage

import {
    AcademicCapIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
  } from '@heroicons/react/24/outline'
  
  const actions = [
    {
      title: 'Meeting 01',
      date: '01/01/2001',
      location: 'Location',
      venue: 'Please check email for venue details',
      description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis etquo et molestiae.',
      voucherLink: "",
      venueLink: ""
    },
    {
      title: 'Meeting 02',
      date: '01/01/2001',
      location: 'Location',
      venue: 'Please check email for venue details',
      description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis etquo et molestiae.',
      voucherLink: "",
      venueLink: ""
    },
    {
      title: 'Meeting 03',
      date: '01/01/2001',
      location: 'Location',
      venue: 'Please check email for venue details',
      description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis etquo et molestiae.',
      voucherLink: "",
      venueLink: ""
    },
    {
      title: 'Meeting 04',
      date: '01/01/2001',
      location: 'Location',
      venue: 'Please check email for venue details',
      description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis etquo et molestiae.',
      voucherLink: "",
      venueLink: ""
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Meetings() {
    return (
        <div className='bg-gradient-to-br from-gray-900 to-gray-800 flex align-center justify-center h-full max-w-7xl mx-auto my-16'>
      <div className="divide-y divide-gray-900 overflow-hidden rounded-lg bg-gray-900 shadow sm:grid sm:grid-cols-2  sm:gap-4 sm:divide-y-0">
        {actions.map((action) => (
          <div
            key={action.title}
            className="rounded-lg bg-gray-800 mb-4 sm:mb-0 mx-4"
          >
            <div className="sm:m-4 p-4">
              <h3 className="text-3xl font-semibold leading-6 text-gray-200">
              {action.title}
              </h3>
              <h4 className="mt-2 text-xl text-gray-100">{action.date}</h4>
              <h4 className="mt-2 text-lg text-gray-300">{action.venue}</h4>
              <p className="mt-2 text-sm text-gray-400">
                {action.description}
              </p>
            </div>
            <div>
            <div className="-mt-px flex divide-x divide-gray-400 border-t border-gray-700">
              <div className="flex w-0 flex-1">
                <Link
                    title="stripe voucher"
                  href={`#email`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border-r border-gray-700 bg-gray-800 hover:bg-purple-900 py-4 text-sm font-semibold text-gray-400 hover:text-gray-200"
                >
                  Purchase Voucher
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                    title="venue info"
                  href={`#venue`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-400 hover:text-gray-200"
                >
                  Venue Info
                </Link>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
      </div>
    )
  }
  