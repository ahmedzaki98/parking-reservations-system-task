import SharedBreadcrumb from "@/components/breadcrumb";
import PageLayout from "@/components/layouts/page-layout";
import Reports from "@/features/reports/components/list";
import { Authorization } from "@/lib/authorization";

export const ReportsRoute = () => {
  return (
    <Authorization allowRoles={["admin"]}>
      <div className="flex flex-col w-full gap-4">
        <SharedBreadcrumb name="Reports" />
        <PageLayout>
          <Reports />
        </PageLayout>
      </div>
    </Authorization>
  );
};
