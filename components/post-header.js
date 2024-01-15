import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      {/* <div className="hidden md:block md:mb-12 text-white">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div> */}
      <div className="mb-8 md:mb-16 sm:mx-0 text-white">
        <CoverImage title={title} image={coverImage} priority />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block mb-2 md:hidden text-white">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      <PostTitle>{title}</PostTitle>
        <div className="mb-4 mt-2 text-xs text-white">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
