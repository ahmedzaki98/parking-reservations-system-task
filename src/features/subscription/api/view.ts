import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { SubscriptionEntity } from "../types";

export const getSubscriptionView = (
  id: string
): Promise<{ data: SubscriptionEntity }> => {
  return api.get(`/subscriptions/${id}`);
};

export const getSubscriptionQueryOptions = (id: string) => {
  const token = localStorage.getItem("token");
  return queryOptions({
    queryKey: ["subscriptionsView", id, token],
    queryFn: () => getSubscriptionView(id),
  });
};

export const useSubscriptionsView = (id: string) => {
  return useQuery({
    ...getSubscriptionQueryOptions(id),
  });
};
