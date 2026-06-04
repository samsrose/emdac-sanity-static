import React from 'react'
import type { GetStaticProps } from 'next'
import { officersQuery, scopeofpracticeQuery, legislativecQuery, advisoryQuery, nominatingQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import type { Committee, Officer } from '../lib/types'

interface CommitteesPageProps {
  allAdvisory: Committee[]
  allLegislative: Committee[]
  allNominating: Committee[]
  allOfficers: Officer[]
  allScopeofPractice: Committee[]
  preview: boolean
}

function Officers({ data }: { data: Officer[] }) {
  const info = data;
  
  info.sort(function(a: Officer, b: Officer) {
    var keyA = new Date(a.order as number),
    keyB = new Date(b.order as number);
    // Compare the 2 orders
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  return (
    <>
    {info.map((item,index) =>
      <div key={index} className="py-2 px-2 sm:py-2 w-full mt-2">
      <div className="shadow-md sm:flex-row border border-1 border-gray-800 rounded grid bg-gray-800" >
        <div className="flex-grow p-4">
          <div className="flex flex-col align-start justify-start" >
            <h1 className="text-gray-200 md:text-2xl text-xl title-font font-normal">
              {item.name}
            </h1>
            <p className='text-gray-200 my-2 text-md title-font font-normal'>
              {item.role}
            </p>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  )
}
function CommitteesItem({ data }: { data: Committee[] }) {
  return (
    <>
    {data.map((item,index) =>
      <div key={index} className="py-2 px-2 sm:py-2 w-full mt-2">
      <div className="shadow-md sm:flex-row border border-1 border-gray-800 rounded grid bg-gray-800" >
        <div className="flex-grow p-4">
          <div className="flex flex-col align-start justify-start" >
            <h1 className="text-gray-200 text-lg title-font font-normal">
              {item.name}
            </h1>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  )
}

export default function Committees({allAdvisory, allLegislative, allNominating, allOfficers, allScopeofPractice, preview}: CommitteesPageProps) {
    
  const [...moreAdvisory] = allAdvisory || []
  const [...moreLegislative] = allLegislative || []
  const [...moreNominating] = allNominating || []
  const [...moreOfficers] = allOfficers || []
  const [...moreScopeofPractice] = allScopeofPractice || []
  
    return (
      <>
        <div className="w-full px-8 text-center">
          <div className="flex flex-wrap bg-gray-900 lg:w-full sm:mx-auto pt-12 px-2">
            <div className="my-4 max-w-xl pr-4 text-center mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 font-heading">EMDAC Committees</h2>
            </div>
          </div>
        </div>
        <div className='py-4 w-full container mx-auto mb-6'>
          <h2 className='text-white text-3xl font-bold pt-8 pb-4 text-left px-2'>Officers</h2>
          {/* <div className='border-b border-gray-700 border-4 rounded mx-2'/> */}
          <div className='grid sm:grid-cols-2 grid-cols-1'>
            <Officers data={moreOfficers} />
          </div>
          <h2 className='text-white text-3xl font-bold pt-8 pb-4 text-left px-2'>Scope of Practice Committee</h2>
          {/* <div className='border-b border-gray-700 border-4 rounded mx-2'/> */}
          <div className='grid md:grid-cols-4 lg:grid-cols-2 grid-cols-1'>
            <CommitteesItem data={moreScopeofPractice} />
          </div>
          <h2 className='text-white text-3xl font-bold pt-8 pb-4 text-left px-2'>Legislative Committee</h2>
          {/* <div className='border-b border-gray-700 border-4 rounded mx-2'/> */}
          <div className='grid md:grid-cols-4 lg:grid-cols-2 grid-cols-1'>
            <CommitteesItem data={moreLegislative} />
          </div>
          <h2 className='text-white text-3xl font-bold pt-8 pb-4 text-left px-2'>Medical Advisory Committee</h2>
          {/* <div className='border-b border-gray-700 border-4 rounded mx-2'/> */}
          <div className='grid md:grid-cols-4 lg:grid-cols-2 grid-cols-1'>
            <CommitteesItem data={moreAdvisory} />
          </div>
          <h2 className='text-white text-3xl font-bold pt-8 pb-4 text-left px-2'>Nominating Committee</h2>
          {/* <div className='border-b border-gray-700 border-4 rounded mx-2'/> */}
          <div className='grid md:grid-cols-4 lg:grid-cols-2 grid-cols-1'>
            <CommitteesItem data={moreNominating} />
          </div>
        </div>
    </>
      )
  }
  
  
 

  export const getStaticProps: GetStaticProps<CommitteesPageProps> = async ({ preview = false }) => {
    const allOfficers: Officer[] = overlayDrafts(await getClient(preview).fetch(officersQuery))
    const allScopeofPractice: Committee[] = overlayDrafts(await getClient(preview).fetch(scopeofpracticeQuery))
    const allLegislative: Committee[] = overlayDrafts(await getClient(preview).fetch(legislativecQuery))
    const allAdvisory: Committee[] = overlayDrafts(await getClient(preview).fetch(advisoryQuery))
    const allNominating: Committee[] = overlayDrafts(await getClient(preview).fetch(nominatingQuery))
    return {
      props: { allOfficers, allScopeofPractice, allLegislative, allAdvisory, allNominating, preview },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
    }
  }
