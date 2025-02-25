import React from 'react'
import Link from "next/link"
import { documentsQuery, evidenceQuery, legislativeQuery, minutesQuery, positionsQuery, protocolsQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Footer from "../components/Footer";

function TableItem({ data }) {
  return (
      <>
      {data.map((content, index) => (
          <tr key={index}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                  {content.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{content.topic}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{content.date}</td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                  {content.file ? (
                    <>
                      <Link href={content.file || ''} className="text-indigo-400 hover:text-indigo-300">
                      Download
                  </Link>
                    </>
                  ):(
                    <>
                    </>
                  )}
                  {content.link ? (
                    <>
                      <Link href={content.link || ''} className="text-indigo-400 hover:text-indigo-300">
                      External Link
                  </Link>
                    </>
                  ):(
                    <>
                    </>
                  )}
              </td>
          </tr>
      ))}
      </>
  )
}


export default function Documents({ allDocuments, allEvidence, allLegislative, allMinutes, allPositions, allProtocols, preview }) {

  const [...moreDocuments] = allDocuments || []
  const [...moreEvidence] = allEvidence || []
  const [...moreLegislative] = allLegislative || []
  const [...moreMinutes] = allMinutes || []
  const [...morePositions] = allPositions || []
  const [...moreProtocols] = allProtocols || []

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-20">
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">Documents</h2>
              <span className="text-red-500 text-xl font-normal">Papers, documents and templates</span>
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
                      <TableItem data={moreDocuments} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* Evidence */}
          <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">Evidence Papers</h2>
              {/* <span className="text-red-500 text-xl font-normal">Papers, documents and templates</span> */}
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
                      <TableItem data={moreEvidence} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* Legislative */}
          <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">Legislative Reviews</h2>
              {/* <span className="text-red-500 text-xl font-normal">Papers, documents and templates</span> */}
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
                      <TableItem data={moreLegislative} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* Minutes */}
          <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">Meeting Minutes</h2>
              {/* <span className="text-red-500 text-xl font-normal">Papers, documents and templates</span> */}
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
                      <TableItem data={moreMinutes} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* Positions */}
          <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">Position Papers</h2>
              {/* <span className="text-red-500 text-xl font-normal">Papers, documents and templates</span> */}
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
                      <TableItem data={morePositions} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* Protocols */}
          <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">Protocol Templates</h2>
              {/* <span className="text-red-500 text-xl font-normal">Papers, documents and templates</span> */}
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
                      <TableItem data={moreProtocols} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className='sm:pb-20'></div>
      </div>
    </div>
  )
}


export async function getStaticProps({ preview = false }) {
  const allDocuments = overlayDrafts(await getClient(preview).fetch(documentsQuery))
  const allEvidence = overlayDrafts(await getClient(preview).fetch(evidenceQuery))
  const allLegislative = overlayDrafts(await getClient(preview).fetch(legislativeQuery))
  const allMinutes = overlayDrafts(await getClient(preview).fetch(minutesQuery))
  const allPositions = overlayDrafts(await getClient(preview).fetch(positionsQuery))
  const allProtocols = overlayDrafts(await getClient(preview).fetch(protocolsQuery))
  
  return {
    props: { allDocuments, allEvidence, allLegislative, allMinutes, allPositions, allProtocols, preview },
    // If webhooks isn't setup then attempt to re-generate in 30 second intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
  }
}