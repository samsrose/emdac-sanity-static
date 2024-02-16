import React from 'react'
import Link from "next/link"
import Footer from "../components/Footer";
import { officersQuery, scopeofpracticeQuery, legislativecQuery, advisoryQuery, nominatingQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'

const data = {
    "Officers": [
      {name: "Kathy Staats, MD", role: "President" },
      {name: "Dustin Ballard, MD", role: "President Elect"},
      {name: "Zita Konick, MD", role: "Secretary"},
      {name: "Daniel Shepherd, MD", role: "Treasurer"},
      {name: "Nichole Bosson, MD", role: "Immediate Past President"},
      {name: "John Rose, MD", role: "At-large Associate Member"},
      {name: "Marc Gautreau, MD", role: "At-Large Associate Member"}
    ],
    "Scope of Practice": [
        "Ken Miller", "Kevin Mackey", "Kimberly Freeman", "Atilla Uner", "Nichole Bosson", "Eric Rudnick", "Marc Gautreau"
    ],
    "Legislative": [
        "Katherine Shafer", "Kathy Staats", "Daniel Shepherd", "Senai Kidane", "Marianne Gausche-Hill", "Zita Konick", "Carl Shulz"
    ],
    "Medical Advisory": [
        "Marianne Gausche-Hill", "John Brown", "Ken Miller", "Eric Rudnick"
    ],
    "Nominating": [
        "Greg Gilbert", "Karl Sporer", "Tom Ronay", "Bruce Haynes"
    ]
}



export default function Committees({allAdvisory, allLegislative, allNominating, allOfficers, allScopeofPractice, preview}) {
    
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
  
  
  function Officers({ data }) {
    const info = data;
    
    info.sort(function(a, b) {
      var keyA = new Date(a.order),
      keyB = new Date(b.order);
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
  function CommitteesItem({ data }) {
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

  export async function getStaticProps({ preview = false }) {
    const allOfficers = overlayDrafts(await getClient(preview).fetch(officersQuery))
    const allScopeofPractice = overlayDrafts(await getClient(preview).fetch(scopeofpracticeQuery))
    const allLegislative = overlayDrafts(await getClient(preview).fetch(legislativecQuery))
    const allAdvisory = overlayDrafts(await getClient(preview).fetch(advisoryQuery))
    const allNominating = overlayDrafts(await getClient(preview).fetch(nominatingQuery))
    return {
      props: { allOfficers, allScopeofPractice, allLegislative, allAdvisory, allNominating, preview },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
    }
  }