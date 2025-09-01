import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SubscriptionView from "@/features/subscription/components/view";
import { Authorization } from "@/lib/authorization";
import { NavLink } from "react-router-dom";

export const SubscriptionsViewRoute = () => {
  return (
    <Authorization allowRoles={["admin"]}>
      <div className="flex flex-col w-full gap-4">
        {/* <SharedBreadcrumb name="Subscriptions Details" /> */}
        <div className="flex md:ps-8 ps-2 py-1 bg-muted">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <NavLink
                  className="hover:text-primary transition-colors"
                  to="/app/subscriptions"
                >
                  Subscriptions
                </NavLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Subscriptions Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="px-8 flex w-full flex-col items-start justify-center md:mt-0">
          <SubscriptionView />
        </div>
      </div>
    </Authorization>
  );
};
