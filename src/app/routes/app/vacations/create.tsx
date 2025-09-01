import SharedBreadcrumb from "@/components/breadcrumb";
import PageLayout from "@/components/layouts/page-layout";
import AddVacationForm from "@/features/vacations/components/add-vacation";
import { Authorization } from "@/lib/authorization";

export const addVacationRoute = () => {
  return (
    <Authorization allowRoles={["admin"]}>
      <div className="flex flex-col w-full gap-4">
        <SharedBreadcrumb name="Add Vacation" />
        <PageLayout>
          <AddVacationForm />
        </PageLayout>
      </div>
    </Authorization>
  );
};
