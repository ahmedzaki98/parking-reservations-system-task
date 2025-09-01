import SharedBreadcrumb from "@/components/breadcrumb";
import CheckOutForm from "@/features/tickets/components/check-out";

export const CheckOutRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Check Out" />
      <div className="px-8 flex w-full flex-col items-start justify-center md:mt-0">
        <CheckOutForm />
      </div>
    </div>
  );
};
