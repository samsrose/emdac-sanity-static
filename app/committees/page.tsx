import { CommitteeGrid, OfficerGrid } from "@/components/ui/CommitteeGrid";
import { getCommittee, getOfficers } from "@/lib/repositories/committees";
import type { CommitteeCategory } from "@/lib/types/sanity";

export const revalidate = 30;

interface CommitteeSection {
  category: CommitteeCategory;
  title: string;
}

const COMMITTEES: CommitteeSection[] = [
  { category: "scopeofpractice", title: "Scope of Practice Committee" },
  { category: "legislativec", title: "Legislative Committee" },
  { category: "medicaladvisory", title: "Medical Advisory Committee" },
  { category: "nominating", title: "Nominating Committee" },
];

export default async function CommitteesPage() {
  const [officers, ...committees] = await Promise.all([
    getOfficers(),
    ...COMMITTEES.map((c) => getCommittee(c.category)),
  ]);

  return (
    <>
      <header className="w-full px-8 text-center">
        <div className="flex flex-wrap bg-gray-900 lg:w-full sm:mx-auto pt-12 px-2">
          <div className="my-4 max-w-xl pr-4 text-center mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-100 font-heading">
              EMDAC Committees
            </h1>
          </div>
        </div>
      </header>
      <div className="py-4 w-full container mx-auto mb-6">
        <h2 className="text-white text-3xl font-bold pt-8 pb-4 text-left px-2">
          Officers
        </h2>
        <OfficerGrid officers={officers} />

        {COMMITTEES.map((section, index) => (
          <section key={section.category}>
            <h2 className="text-white text-3xl font-bold pt-8 pb-4 text-left px-2">
              {section.title}
            </h2>
            <CommitteeGrid members={committees[index] ?? []} />
          </section>
        ))}
      </div>
    </>
  );
}
