import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { TicketEntity } from "../types";

export const getTicket = (
  id?: string
): Promise<{ data: TicketEntity }> => {
  return api.get(`/tickets/${id}`);
};

export const getSubscriptionQueryOptions = (id?: string) => {
  const token = localStorage.getItem("token");
  return queryOptions({
    queryKey: ["getTicket", id, token],
    enabled: !!id,
    queryFn: () => getTicket(id),
  });
};

export const useTicket = (id?: string) => {
  return useQuery({
    ...getSubscriptionQueryOptions(id),
  });
};
