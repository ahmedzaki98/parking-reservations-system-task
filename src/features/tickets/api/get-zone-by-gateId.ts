import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ZonesEntity } from "@/features/zones/types";

export const getZones = (gateId: string): Promise<{ data: ZonesEntity[] }> => {
  return api.get("/master/zones", {
    params: {
      gateId,
    },
  });
};

export const getZonesQueryOptions = (gateId: string) => {
  const token = localStorage.getItem("token");
  return queryOptions({
    queryKey: ["zonesGate", token, gateId],
    enabled: !!gateId,
    queryFn: () => getZones(gateId),
  });
};

export const useZonesByGate = (gateId: string) => {
  return useQuery({
    ...getZonesQueryOptions(gateId),
  });
};
