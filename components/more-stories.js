import PostPlug from './post-plug'

export default function MoreStories({ posts, buttonLink }) {
  return (
    <section>
      <div className="bg-gradient-to-b from-gray-800/50 to-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none py-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl">In The News</h2>
            <p className="mt-4 text-xl leading-4 text-gray-300">
              Events and updates curated by EMDAC
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 lg:gap-x-8 gap-y-12 md:gap-y-16 mb-12">
            {posts.map((post) => (
              <PostPlug
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
                buttonLink={buttonLink}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
