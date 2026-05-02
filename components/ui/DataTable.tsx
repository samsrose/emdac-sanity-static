import Link from "next/link";
import type { Resource } from "@/lib/types/sanity";

interface DataTableProps {
  title: string;
  subjectLabel: string;
  rows: Resource[];
  description?: string;
}

/**
 * Single, generic table for every resource category.
 *
 * Replaces MinuteItem, DocumentsItem, EvidenceItem, LegislativeItem,
 * PositionItem, and ProtocolItem — all of which were near-duplicates that
 * differed only in a single field name. SOLID: Open/Closed (configurable
 * via props) and Single Responsibility (renders a resource list, nothing
 * else).
 */
export function DataTable({ title, subjectLabel, rows, description }: DataTableProps) {
  return (
    <section className="bg-gray-900 py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">
              {title}
            </h2>
            {description && (
              <p className="text-red-500 text-xl font-normal">{description}</p>
            )}
          </div>
        </header>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <ColumnHeader>Name</ColumnHeader>
                    <ColumnHeader>{subjectLabel}</ColumnHeader>
                    <ColumnHeader>Date</ColumnHeader>
                    <ColumnHeader>Attachment</ColumnHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {rows.map((row) => (
                    <ResourceRow key={row._id} row={row} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ColumnHeader({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0 first:pl-4 first:sm:pl-0"
    >
      {children}
    </th>
  );
}

function ResourceRow({ row }: { row: Resource }) {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
        {row.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
        {row.subject ?? "—"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{row.date}</td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
        <ResourceLinks row={row} />
      </td>
    </tr>
  );
}

function ResourceLinks({ row }: { row: Resource }) {
  if (!row.file && !row.link) return <span className="text-gray-500">&mdash;</span>;
  return (
    <div className="flex gap-4">
      {row.file && (
        <Link
          href={row.file}
          className="text-indigo-400 hover:text-indigo-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </Link>
      )}
      {row.link && (
        <Link
          href={row.link}
          className="text-indigo-400 hover:text-indigo-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          External Link
        </Link>
      )}
    </div>
  );
}
