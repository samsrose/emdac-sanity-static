import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import type { DirectoryPerson } from "@/lib/types/sanity";
import { cn } from "@/lib/utils/cn";

type DirectoryVariant = "member" | "associate";

interface DirectoryCardProps {
  person: DirectoryPerson;
  variant?: DirectoryVariant;
}

const variantStyles: Record<DirectoryVariant, string> = {
  member:
    "bg-gradient-to-tr from-gray-600 from-10% via-gray-700 via-30% to-gray-800 to-70%",
  associate: "bg-gray-700/80",
};

/**
 * Replaces IsMemberDirectory + IsAssociateDirectory, which differed only by
 * Tailwind classes. The variant prop encodes that one difference.
 */
export function DirectoryCard({ person, variant = "member" }: DirectoryCardProps) {
  return (
    <li
      className={cn(
        "divide-y divide-gray-900 rounded-lg shadow",
        variantStyles[variant],
      )}
    >
      <div className="flex w-full items-center justify-between space-x-6 px-6 py-4">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-xl font-medium text-gray-200">
              {person.firstName} {person.lastName}
            </h3>
          </div>
          {person.position && (
            <p className="mt-1 truncate text-sm text-gray-300">{person.position}</p>
          )}
        </div>
      </div>
      {person.email && (
        <div>
          <div className="-mt-px flex divide-x divide-gray-900 bg-gray-800/25">
            <div className="flex w-0 flex-1">
              <Link
                href={`mailto:${person.email}`}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border border-transparent py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800/40 transition"
              >
                <EnvelopeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                Email
              </Link>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
