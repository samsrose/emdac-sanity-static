import { EnvelopeIcon } from '@heroicons/react/20/solid'
import Link from "next/link"

export default function IsMemberDirectory({ data }) {

    return (
      <>
      {data.map((post, index) => (
        <li key={index + 1} className="divide-y divide-gray-900 rounded-lg shadow bg-gradient-to-tr from-gray-600 from-10% via-gray-700 via-30% to-gray-800 to-70%">
          <div className="flex w-full items-center justify-between space-x-6 px-6 py-4">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-xl font-medium text-gray-200">{post.firstName} {post.lastName}</h3>
              </div>
              <p className="mt-1 truncate text-sm text-gray-300">{post.position}</p>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-900 bg-gray-800/25">
              <div className="flex w-0 flex-1">
                <Link
                  href={`mailto:${post.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border border-transparent py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800/40 transition"
                >
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  Email
                </Link>
              </div>
            </div>
          </div>
        </li>
        ))}
      </>
    )
  }