import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'
import { Author, SanityImageSource } from '../lib/types'

interface PostPlugProps {
  title?: string
  coverImage?: SanityImageSource
  date?: string
  slug?: string
  author?: Author
  excerpt?: string
  buttonLink?: string
  buttonName?: string
}

export default function PostPlug({
  title,
  coverImage,
  date,
  slug,
  buttonLink,
  buttonName
}: PostPlugProps) {
  return (
    <div className='rounded-md'>
      <div className="mb-4">
        <CoverImage slug={slug} title={title} image={coverImage} />
      </div>
      <div className="text-md text-gray-200">
        <Date dateString={date} />
      </div>
      <h3 className="text-xl leading-snug text-gray-200">
        {title}
      </h3>
      <br/>
      {slug ? <Link className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-500/90 transition" href={`/posts/${slug}`}>Learn More</Link> : <>.</>}
    </div>
  )
}
