import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { ZonesEntity } from "../types";
import { useWebSocketStore } from "@/lib/websocket-store";

export const getZones = (): Promise<{ data: ZonesEntity[] }> => {
  return api.get("/master/zones");
};

export const getZonesQueryOptions = () => {
  const token = localStorage.getItem("token");
  const { refreshKey } = useWebSocketStore.getState();
  return queryOptions({
    queryKey: ["zonesGrid", token, refreshKey],
    queryFn: getZones,
  });
};

export const useZones = () => {
  return useQuery({
    ...getZonesQueryOptions(),
  });
};
