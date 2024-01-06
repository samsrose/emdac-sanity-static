import { directoryQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import IsMemberDirectory from "../components/IsMemberDirectory"
import IsAssociateDirectory from "../components/IsAssociateDirectory"

export default function Directory({ allMembers, preview }) {

  const [...moreMembers] = allMembers || []


  // console.log(moremembers)
  // console.log(allmembers)

  // basic setup works as intended, but data is not correctly structured!!!
  // ============================================================================
  // fix - just passes in more members rather than sorting members and associates
  // even though lines 23 and 27 explicitly check for if theyre members the same
  // data gets passed to the components; data needs to be modified before passing
  // ============================================================================

  return (
    <>
      <h1 className='p-4 text-gray-200 leading-4 text-4xl text-center mt-8'>EMDAC Directory</h1>
      
      <section className='border border-gray-900'>
        <div className="bg-gradient-to-b to-gray-800/50 from-gray-900">
          <div className="mx-auto px-6 lg:px-8">
            <ul role="list" className="grid grid-cols-1 gap-6 py-8 px-8">
            <h1 className='p-4 text-gray-200 leading-4 text-3xl text-center'>Members</h1>
              <div className="mx-auto w-full grid grid-cols-2 lg:grid-cols-2 md:gap-x-4 lg:gap-x-4 gap-y-4 md:gap-y-4 mb-12">
                {moreMembers.isAssociate = true && <IsMemberDirectory data={moreMembers} />}
              </div>
              <h1 className='p-4 text-gray-200 leading-4 text-4xl text-center'>Associates</h1>
              <div className="mx-auto w-full grid grid-cols-2 lg:grid-cols-2 md:gap-x-4 lg:gap-x-4 gap-y-4 md:gap-y-4 mb-12">
                {moreMembers.isAssociate != true && <IsAssociateDirectory data={moreMembers} />}
              </div>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allMembers = overlayDrafts(await getClient(preview).fetch(directoryQuery))
  return {
    props: { allMembers, preview },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 30,
  }
}