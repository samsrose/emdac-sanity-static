import Link from "next/link"

export default function Custom500() {
    return (
      <div className="min-h-screen">
        <h1 className="text-white text-center font-thin py-24 text-4xl">404 - Page Not Found</h1>
        <div className="flex justify-center align-center">
          <Link href="/" className="px-6 py-1 bg-gray-400 text-gray-900 hover:text-gray-800 rounded-sm">Back</Link>
        </div>
      </div>
    )
  }