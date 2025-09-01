import SharedBreadcrumb from "@/components/breadcrumb";
import CheckInForm from "@/features/tickets/components/check-in";

export const CheckInRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Check In" />
      <div className="px-8 flex w-full flex-col items-start justify-center md:mt-0">
        <CheckInForm />
      </div>
    </div>
  );
};
