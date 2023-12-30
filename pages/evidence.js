import React from 'react'
import Link from "next/link"
import { evidenceQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import EvidenceItem from "../components/EvidenceItem";

export default function Evidence({ allEvidence, preview }) {

  const [...moreEvidence] = allEvidence || []

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">Evidence</h2>
              <span className="text-red-500 text-xl font-normal">Evidentiary reviews by EMDAC</span>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Topic
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Attachment
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      <EvidenceItem data={...moreEvidence} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getStaticProps({ preview = false }) {
  const allEvidence = overlayDrafts(await getClient(preview).fetch(evidenceQuery))
  
  return {
    props: { allEvidence, preview },
    // If webhooks isn't setup then attempt to re-generate in 30 second intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
  }
}