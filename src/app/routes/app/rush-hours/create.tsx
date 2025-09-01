import SharedBreadcrumb from "@/components/breadcrumb";
import RushHourForm from "@/features/rush-hours/components/add-rush-hours";
import { Authorization } from "@/lib/authorization";

export const RushHoursRoute = () => {
  return (
    <Authorization allowRoles={["admin"]}>
      <div className="flex flex-col w-full gap-4">
        <SharedBreadcrumb name="Add Rush Hours" />
        <div className="px-8 flex w-full flex-col items-start justify-center md:mt-0">
          <RushHourForm />
        </div>
      </div>
    </Authorization>
  );
};
