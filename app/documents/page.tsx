import { DataTable } from "@/components/ui/DataTable";
import { RESOURCE_SECTIONS, getResources } from "@/lib/repositories/resources";

export const revalidate = 30;

export default async function DocumentsPage() {
  const sections = await Promise.all(
    RESOURCE_SECTIONS.map(async (config) => ({
      config,
      rows: await getResources(config.category),
    })),
  );

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {sections.map(({ config, rows }, index) => (
          <DataTable
            key={config.category}
            title={config.title}
            subjectLabel={config.subjectLabel}
            rows={rows}
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
