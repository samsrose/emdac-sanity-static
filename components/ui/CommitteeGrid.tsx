import type { CommitteeMember, Officer } from "@/lib/types/sanity";

interface OfficerGridProps {
  officers: Officer[];
}

export function OfficerGrid({ officers }: OfficerGridProps) {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1">
      {officers.map((officer) => (
        <article
          key={officer._id}
          className="py-2 px-2 sm:py-2 w-full mt-2"
          aria-labelledby={`officer-${officer._id}`}
        >
          <div className="shadow-md sm:flex-row border border-1 border-gray-800 rounded grid bg-gray-800">
            <div className="flex-grow p-4">
              <div className="flex flex-col align-start justify-start">
                <h3
                  id={`officer-${officer._id}`}
                  className="text-gray-200 md:text-2xl text-xl title-font font-normal"
                >
                  {officer.name}
                </h3>
                <p className="text-gray-200 my-2 text-md title-font font-normal">
                  {officer.role}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

interface CommitteeGridProps {
  members: CommitteeMember[];
}

export function CommitteeGrid({ members }: CommitteeGridProps) {
  return (
    <div className="grid md:grid-cols-4 lg:grid-cols-2 grid-cols-1">
      {members.map((member) => (
        <div key={member._id} className="py-2 px-2 sm:py-2 w-full mt-2">
          <div className="shadow-md sm:flex-row border border-1 border-gray-800 rounded grid bg-gray-800">
            <div className="flex-grow p-4">
              <div className="flex flex-col align-start justify-start">
                <h4 className="text-gray-200 text-lg title-font font-normal">
                  {member.name}
                </h4>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
