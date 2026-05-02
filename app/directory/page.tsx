import { DirectoryCard } from "@/components/ui/DirectoryCard";
import { getDirectoryPageData } from "@/lib/repositories/directory";

export const revalidate = 30;

export default async function DirectoryPage() {
  const { members, associates } = await getDirectoryPageData();

  return (
    <>
      <h1 className="p-4 text-gray-200 leading-4 text-4xl text-center mt-8">
        EMDAC Directory
      </h1>

      <section className="border border-gray-900">
        <div className="bg-gradient-to-b to-gray-800/50 from-gray-900">
          <div className="mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 py-8 px-8">
              <h2 className="p-4 text-gray-200 leading-4 text-3xl text-center">
                Members
              </h2>
              <ul className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-4 lg:gap-x-4 gap-y-4 md:gap-y-4 mb-12">
                {members.map((person) => (
                  <DirectoryCard key={person._id} person={person} variant="member" />
                ))}
              </ul>

              <h2 className="p-4 text-gray-200 leading-4 text-4xl text-center">
                Associates
              </h2>
              <ul className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-4 lg:gap-x-4 gap-y-4 md:gap-y-4 mb-12">
                {associates.map((person) => (
                  <DirectoryCard
                    key={person._id}
                    person={person}
                    variant="associate"
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
