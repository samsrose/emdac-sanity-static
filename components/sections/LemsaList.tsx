import Link from "next/link";
import type { LemsaCounty, LemsaRegion } from "@/lib/data/lemsa";
import { cn } from "@/lib/utils/cn";

interface LemsaListProps {
  regions: LemsaRegion[];
}

export function LemsaList({ regions }: LemsaListProps) {
  return (
    <ul className="w-full">
      {regions.map((region) => (
        <li
          key={region.name}
          className="border border-gray-500 rounded p-4 grid grid-cols-2 my-4"
        >
          <h2 className="text-xl font-medium p-4">{region.name}</h2>
          <div>
            {region.data.map((county, index) => (
              <CountyDropdown key={`${county.id}-${index}`} county={county} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

function CountyDropdown({ county }: { county: LemsaCounty }) {
  return (
    <details
      className="collapse collapse-arrow rounded my-1 open:bg-gray-700"
      style={{ backgroundColor: county.fill }}
    >
      <summary
        className={cn(
          "collapse-title text-md font-medium cursor-pointer",
          county.fill === "#ddd" ? "text-black" : "text-white",
        )}
      >
        {county.countyName}
      </summary>
      <div className="collapse-content">
        {county.uri ? (
          <Link
            href={county.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="pb-1 text-sm border-b-2"
          >
            View agency website
          </Link>
        ) : (
          <span className="text-sm text-gray-400">No website on file</span>
        )}
      </div>
    </details>
  );
}
