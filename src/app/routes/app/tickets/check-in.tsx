import SharedBreadcrumb from "@/components/breadcrumb";
import PageLayout from "@/components/layouts/page-layout";
import CheckInForm from "@/features/tickets/components/check-in";

export const CheckInRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Check In" />
      <PageLayout>
        <CheckInForm />
      </PageLayout>
    </div>
  );
};
