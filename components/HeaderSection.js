export default function HeroSection() {
    return (

<div className="relative bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pt-8 pb-12 bg-gray-900 sm:py-12 md:pb-24 lg:max-w-2xl lg:w-full lg:pb-12 xl:pb-12">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-40 text-white transform translate-x-1/2"
            fill="rgb(17,24,39)"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 md:mb-8 lg:mt-2 lg:px-8 xl:my-4">
            <div className="sm:text-left">
              <h1 className="text-6xl pl-6 md:p-0 tracking-loose font-extrabold text-gray-200 sm:text-5xl md:text-6xl">
                <span className="block text-red-600 xl:inline">Emergency Medical Services</span>{' '}
                <span className="block xl:inline">Directors' Association of California</span>
              </h1>
              <p className="mt-3 pl-6 md:pl-0 pt-4 text-xl text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              The Mission of EMDAC is to provide leadership and expert opinion in the medical oversight, direction and coordination of Emergency Medical Services for the people of the State of California
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/index.jpg"
          alt=""
        />
      </div>
    </div>

    )}