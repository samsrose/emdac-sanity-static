import { membersQuery, associatesQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import IsMemberDirectory from "../components/IsMemberDirectory"
import IsAssociateDirectory from "../components/IsAssociateDirectory"
import Footer from "../components/Footer";

export default function Directory({ allMembers, allAssociates, preview }) {

  const [...moreMembers] = allMembers || []
  const [...moreAssociates] = allAssociates || []

  return (
    <>
      <h1 className='p-4 text-gray-200 leading-4 text-4xl text-center mt-8'>EMDAC Directory</h1>
      
      <section className='border border-gray-900'>
        <div className="bg-gradient-to-b to-gray-800/50 from-gray-900">
          <div className="mx-auto px-6 lg:px-8">
            <ul role="list" className="grid grid-cols-1 gap-6 py-8 px-8">
            <h1 className='p-4 text-gray-200 leading-4 text-3xl text-center'>Members</h1>
              <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-4 lg:gap-x-4 gap-y-4 md:gap-y-4 mb-12">
                <IsMemberDirectory data={moreMembers} />
              </div>
              <h1 className='p-4 text-gray-200 leading-4 text-4xl text-center'>Associates</h1>
              <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-4 lg:gap-x-4 gap-y-4 md:gap-y-4 mb-12">
                <IsAssociateDirectory data={moreAssociates} />
              </div>
              <br/>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allMembers = overlayDrafts(await getClient(preview).fetch(membersQuery))
  const allAssociates = overlayDrafts(await getClient(preview).fetch(associatesQuery))
  return {
    props: { allMembers, allAssociates, preview },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
  }
}