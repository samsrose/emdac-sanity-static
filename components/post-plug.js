import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPlug({
  title,
  coverImage,
  date,
  slug,
}) {
  return (
    <div className='rounded-md'>
      <div className="mb-4">
        <CoverImage slug={slug} title={title} image={coverImage} />
      </div>
      <div className="text-md text-gray-200">
        <Date dateString={date} />
      </div>
      <h3 className="text-xl leading-snug text-gray-200">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
    </div>
  )
}
