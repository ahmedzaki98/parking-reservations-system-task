import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { ZonesEntity } from "../types";

export const getZones = (): Promise<{ data: ZonesEntity[] }> => {
  return api.get("/master/zones");
};

export const getZonesQueryOptions = () => {
  const token = localStorage.getItem("token");
  return queryOptions({
    queryKey: ["zonesGrid", token],
    queryFn: getZones,
  });
};

export const useZones = () => {
  return useQuery({
    ...getZonesQueryOptions(),
  });
};
