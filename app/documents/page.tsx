import { DataTable } from "@/components/ui/DataTable";
import {
  RESOURCE_SECTIONS,
  getDocumentsPageData,
} from "@/lib/repositories/resources";

export const revalidate = 30;

export default async function DocumentsPage() {
  const data = await getDocumentsPageData();

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {RESOURCE_SECTIONS.map((config, index) => (
          <DataTable
            key={config.category}
            title={config.title}
            subjectLabel={config.subjectLabel}
            rows={data[config.category]}
            description={
              index === 0 ? "Papers, documents and templates" : undefined
            }
          />
        ))}
        <div className="sm:pb-20" />
      </div>
    </div>
  );
}
