import React from 'react'
import Link from "next/link"
// import Minutes from "../components/Minutes"
// import Templates from "../components/Templates"
// import Positions from "../components/Positions"
// import Reviews from "../components/Reviews"
// import Legislative from "../components/Legislative"

// const Documents = () => {
//   return (
//     <>
//     <div className='w-full py-12' >
//       <div className="flex flex-wrap bg-gray-900 sm:mx-auto pt-4 px-2">
//         <div className="my-4 pr-4 text-center mx-auto">
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">Documents</h2>
//           <span className="text-red-500 text-xl font-normal">Papers, documents and templates</span>
//         </div>
//       </div>
//       <div className='mx-auto w-full'>
//         <Minutes/>
//       </div>
//       <div className='mx-auto w-full'>
//         <Templates/>
//       </div>
//       <div className='mx-auto w-full'>
//         <Positions/>
//       </div>
//       <div className='mx-auto w-full'>
//         <Reviews/>
//       </div>
//       <div className='mx-auto w-full'>
//         <Legislative/>
//       </div>
//     </div>
//     </>
//   )
// }

// export default Documents;


const minutes = [
  { name: 'Spring 2023', venue: 'Anaheim', date: '03/14/2023', link: 'url' },
  { name: 'Winter 2022', venue: 'Alameda', date: '12/12/2022', link: 'url' },
  { name: 'Fall 2022', venue: 'San Diego', date: '09/20/2022', link: 'url' },
  { name: 'Summer 2022', venue: 'Virtual', date: '06/14/2022', link: 'url' },
  { name: 'Spring 2022', venue: 'Virtual', date: '03/15/2022', link: 'url' },
  { name: 'Winter 2021', venue: 'Virtual', date: '07/12/2021', link: 'url' },
  { name: 'Fall 2021', venue: 'Virtual', date: '09/21/2021', link: 'url' },
  { name: 'Summer 2021', venue: 'Virtual', date: '06/15/2021', link: 'url' },
  { name: 'Spring 2021', venue: 'Virtual', date: '03/16/2021', link: 'url' },
  { name: 'Winter 2020', venue: 'Marines\' Memorial Club & Hotel', date: '12/08/2020', link: 'url' },
  { name: 'Fall 2020', venue: 'Holiday Inn Bayside Hotel', date: '09/15/2020', link: 'url' },
  { name: 'Summer 2020', venue: 'Sacramento', date: '06/16/2020', link: 'url' },
  { name: 'Spring 2020', venue: 'Embassy Suites by Hilton Anaheim South', date: '03/17/2020', link: 'url' },
  
]

export default function Documents() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
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
                          Venue
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Minutes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {minutes.map((content, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {content.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{content.venue}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{content.date}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                            <Link href={content.link} className="text-indigo-400 hover:text-indigo-300">
                              Download
                            </Link>
                          </td>
                        </tr>
                      ))}
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
