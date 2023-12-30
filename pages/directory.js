import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
// import members from "./api/members.json";
import { directoryQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

export default function Directory({ allMembers, preview }) {
  return (
    <>
    <h1 className='p-4 text-gray-200 leading-4 text-3xl text-center mt-8'>EMDAC Directory</h1>
    <h1 className='p-4 text-gray-200 leading-4 text-2xl text-center mt-2'>Members</h1>
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-8 px-8">
      <DirectoryCards allMembers={allMembers}/>
    </ul>
    {/* <h1 className='p-4 text-gray-200 leading-4 text-2xl text-center mt-2'>Associates</h1>
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-8 px-8">
      {members.map((person) => (
        <li key={person.email} className="col-span-1 divide-y divide-gray-900 rounded-lg bg-gray-700 shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-200">{person.name || "=== NAME MISSING ==="}</h3>
              </div>
              <p className="mt-1 truncate text-sm text-gray-300">{person.title}</p>
            </div>
       
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-900">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:bg-gray-900/40 transition"
                >
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  Email
                </a>
              </div>
          </div>
        </li>
      ))}
    </ul> */}
   
    </>
  )
}

function DirectoryCards({allMembers, preview}) {
  const [...moreMembers] = allMembers || []
  return (
    <>
      {moreMembers.length > 0 && <DirectoryCard data={moreMembers} />}
    </>
  )
}

function DirectoryCard({ data }) {
  return (
    <section className='border border-gray-800'>
      <div className="bg-gradient-to-b from-gray-800/50 to-gray-900">
        <div className="mx-auto px-6 lg:px-8">
          <div className="mx-auto w-full lg:mx-0 py-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl">In The News</h2>
            <p className="mt-4 text-xl leading-4 text-gray-300">
              Events and updates curated by EMDAC
            </p>
          </div>
          <div className="grid grid-cols-1 md:gap-x-4 lg:gap-x-8 gap-y-12 md:gap-y-16 mb-12">
            {data.map((post, index) => (
               <IsMember post={post} index={index} />
             ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function IsMember({post, index}) {
  return (
    <>
      <li key={index} className="col-span-3 divide-y divide-gray-900 rounded-lg bg-gray-700 shadow">
               <div className="flex w-full items-center justify-between space-x-6 p-6">
                 <div className="flex-1 truncate">
                   <div className="flex items-center space-x-3">
                     <h3 className="truncate text-xl font-medium text-gray-200">{post.firstName} {post.lastName}</h3>
                   </div>
                   <p className="mt-1 truncate text-sm text-gray-300">{post.position}</p>
                 </div>
               </div>
               <div>
                 <div className="-mt-px flex divide-x divide-gray-900">
                   <div className="flex w-0 flex-1">
                     <a
                       href={`mailto:${post.email}`}
                       className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:bg-gray-900/40 transition"
                     >
                       <EnvelopeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                       Email
                     </a>
                   </div>
                 </div>
               </div>
             </li>
    </>
  )
}

function IsAssociate({post, index}) {
  return (
    <>
      <li key={index} className="col-span-3 divide-y divide-gray-900 rounded-lg bg-gray-500 shadow">
               <div className="flex w-full items-center justify-between space-x-6 p-6">
                 <div className="flex-1 truncate">
                   <div className="flex items-center space-x-3">
                     <h3 className="truncate text-xl font-medium text-gray-200">{post.firstName} {post.lastName}</h3>
                   </div>
                   <p className="mt-1 truncate text-sm text-gray-300">{post.position}</p>
                 </div>
               </div>
               <div>
                 <div className="-mt-px flex divide-x divide-gray-900">
                   <div className="flex w-0 flex-1">
                     <a
                       href={`mailto:${post.email}`}
                       className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:bg-gray-900/40 transition"
                     >
                       <EnvelopeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                       Email
                     </a>
                   </div>
                 </div>
               </div>
             </li>
    </>
  )
}




export async function getStaticProps({ preview = false }) {
  const allMembers = overlayDrafts(await getClient(preview).fetch(directoryQuery))
  return {
    props: { allMembers, preview },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
  }
}