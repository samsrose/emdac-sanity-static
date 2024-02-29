import Link from "next/link"
import markdownStyles from './markdown-styles.module.css'
import { PortableText } from '@portabletext/react'

export default function BlogSections({date, title, content, buttonLink, buttonName}) {
    return (
      <div className="overflow-hidden bg-gray-900 px-6 py-16 lg:px-8 xl:py-36">
        <div className="mx-auto max-w-max lg:max-w-7xl">
          <div className="relative z-10 mb-8 md:mb-2 md:px-6">
            <div className="max-w-prose text-base lg:max-w-none">
              <h2 className="font-semibold text-2xl leading-6 text-gray-400">In The News</h2>
              <p className="mt-4 mb-6 text-3xl font-bold leading-8 tracking-tight text-gray-300 sm:text-4xl">
                {title}
              </p>
            </div>
          </div>
          <div className="relative">
            <svg
              className="absolute right-0 top-0 -mr-10 -mt-10 hidden md:block md:[overflow-anchor:none]"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-700" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)" />
            </svg>
            <svg
              className="absolute bottom-0 left-0 -mb-10 -ml-10 hidden md:block md:[overflow-anchor:none]"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="7a00fe67-0343-4a3c-8e81-c145097a3ce0"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-700" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)" />
            </svg>
            <div className="relative md:bg-gray-800 md:p-6">
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="text-gray-500 lg:max-w-none">
                    <div className={`prose prose-lg prose-indigo text-gray-400 mx-auto ${markdownStyles.markdown}`}>
                            <PortableText value={content} />
                    </div>
                    {buttonLink ? <Link className="px-4 py-2 my-4 bg-indigo-500 text-white rounded hover:bg-indigo-500/90 transition" href={`${buttonLink}`}>{buttonName ? buttonName : 'Learn More'}</Link> : <> </>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  