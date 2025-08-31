import SharedBreadcrumb from "@/components/breadcrumb";
import GatesList from "@/features/gates/components/list";

export const GatesRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Gates" />
      <div className="px-8 flex w-full flex-col items-start justify-center md:mt-0">
        <GatesList />
      </div>
    </div>
  );
};
