import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { SubscriptionEntity } from "../types";

export const getSubscription = (): Promise<{ data: SubscriptionEntity[] }> => {
  return api.get("/admin/subscriptions");
};

export const getSubscriptionQueryOptions = () => {
  const token = localStorage.getItem("token");
  return queryOptions({
    queryKey: ["subscriptionsGrid", token],
    queryFn: getSubscription,
  });
};

export const useSubscriptions = () => {
  return useQuery({
    ...getSubscriptionQueryOptions(),
  });
};
