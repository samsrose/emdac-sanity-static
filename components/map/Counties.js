import React from 'react';
import Link from "next/link"

export default function Counties({counties}) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {counties.map((county, index) => (
          <div
            key={index}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="min-w-0 flex-1">
              <Link href="#" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{county.name}</p>
                <p className="truncate text-sm text-gray-500">{county.role}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )
}
  