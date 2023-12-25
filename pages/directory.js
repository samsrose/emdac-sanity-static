import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import members from "./api/members.json";


export default function Directory() {
  return (
    <>
    <h1 className='p-4 text-gray-200 leading-4 text-3xl text-center mt-8'>EMDAC Directory</h1>
    <h1 className='p-4 text-gray-200 leading-4 text-2xl text-center mt-2'>Members</h1>
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-8 px-8">
      {members.map((person) => (
        <li key={person.email} className="col-span-1 divide-y divide-gray-900 rounded-lg bg-gray-700 shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-200">{person.name}</h3>
                {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {person.role}
                </span> */}
              </div>
              <p className="mt-1 truncate text-sm text-gray-300">{person.title}</p>
            </div>
            {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={person.imageUrl} alt="" /> */}
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-900">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:bg-gray-800 transition"
                >
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Email
                </a>
              </div>
              {/* <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${person.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-300"
                >
                  <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Call
                </a>
              </div> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
   
    </>
  )
}
