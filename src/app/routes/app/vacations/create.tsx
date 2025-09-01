import SharedBreadcrumb from "@/components/breadcrumb";
import AddVacationForm from "@/features/vacations/components/add-vacation";
import { Authorization } from "@/lib/authorization";

export const addVacationRoute = () => {
  return (
    <Authorization allowRoles={["admin"]}>
      <div className="flex flex-col w-full gap-4">
        <SharedBreadcrumb name="Add Vacation" />
        <div className="px-8 flex w-full flex-col items-start justify-center md:mt-0">
          <AddVacationForm />
        </div>
      </div>
    </Authorization>
  );
};
