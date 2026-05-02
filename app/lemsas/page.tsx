import { LemsaList } from "@/components/sections/LemsaList";
import { lemsaRegions } from "@/lib/data/lemsa";

export const metadata = {
  title: "California LEMSAs",
  description: "Local Emergency Medical Services Agencies in California",
};

export default function LemsasPage() {
  return (
    <>
      <header className="flex flex-wrap sm:mx-auto pt-12 pb-12 px-2 bg-gray-900">
        <div className="my-8 max-w-xl pr-4 text-center mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">
            California LEMSAs
          </h1>
          <p className="text-red-500 text-xl font-normal">
            Expand each county for more information
          </p>
        </div>
      </header>
      <section className="text-gray-100 body-font lg:w-2/3 w-full px-4 mb-24 mx-auto h-full flex">
        <LemsaList regions={lemsaRegions} />
      </section>
    </>
  );
}
