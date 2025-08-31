import SharedBreadcrumb from "@/components/breadcrumb";
import ZonesList from "@/features/zones/components/list";

export const ZonesRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Zones" />
      <div className="px-8 flex w-full flex-col items-start justify-center md:mt-0">
        <ZonesList />
      </div>
    </div>
  );
};
