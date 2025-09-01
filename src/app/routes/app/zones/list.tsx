import SharedBreadcrumb from "@/components/breadcrumb";
import PageLayout from "@/components/layouts/page-layout";
import ZonesList from "@/features/zones/components/list";

export const ZonesRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Zones" />
      <PageLayout>
        <ZonesList />
      </PageLayout>
    </div>
  );
};
