import SharedBreadcrumb from "@/components/breadcrumb";
import PageLayout from "@/components/layouts/page-layout";
import SubscriptionsList from "@/features/subscription/components/list";
import { Authorization } from "@/lib/authorization";

export const SubscriptionsRoute = () => {
  return (
    <Authorization allowRoles={["admin"]}>
      <div className="flex flex-col w-full gap-4">
        <SharedBreadcrumb name="Subscriptions" />
        <PageLayout>
          <SubscriptionsList />
        </PageLayout>
      </div>
    </Authorization>
  );
};
