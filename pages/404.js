import Link from "next/link"

export default function Custom404() {
    return (
      <>
        <main className="grid min-h-full h-screen place-items-center bg-gray-700 px-6 py-6 sm:py-6 lg:px-8 -mt-24">
          <div className="text-center">
            <p className="text-6xl font-semibold text-gray-200">4😮4</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-300 sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }
  