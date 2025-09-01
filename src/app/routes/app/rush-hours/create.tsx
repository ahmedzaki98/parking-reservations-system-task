import SharedBreadcrumb from "@/components/breadcrumb";
import PageLayout from "@/components/layouts/page-layout";
import RushHourForm from "@/features/rush-hours/components/add-rush-hours";
import { Authorization } from "@/lib/authorization";

export const RushHoursRoute = () => {
  return (
    <Authorization allowRoles={["admin"]}>
      <div className="flex flex-col w-full gap-4">
        <SharedBreadcrumb name="Add Rush Hours" />
        <PageLayout>
          <RushHourForm />
        </PageLayout>
      </div>
    </Authorization>
  );
};
