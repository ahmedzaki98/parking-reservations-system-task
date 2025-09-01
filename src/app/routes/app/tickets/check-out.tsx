import SharedBreadcrumb from "@/components/breadcrumb";
import PageLayout from "@/components/layouts/page-layout";
import CheckOutForm from "@/features/tickets/components/check-out";

export const CheckOutRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Check Out" />
      <PageLayout>
        <CheckOutForm />
      </PageLayout>
    </div>
  );
};
