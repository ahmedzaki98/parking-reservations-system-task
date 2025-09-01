import SharedBreadcrumb from "@/components/breadcrumb";
import PageLayout from "@/components/layouts/page-layout";
import GatesList from "@/features/gates/components/list";

export const GatesRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Gates" />
      <PageLayout>
        <GatesList />
      </PageLayout>
    </div>
  );
};
