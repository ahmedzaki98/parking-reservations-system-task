import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { GatesEntity } from "../types";

export const getGates = (): Promise<{ data: GatesEntity[] }> => {

  return api.get("/master/Gates");
};

export const getGatesQueryOptions = () => {
  const token = localStorage.getItem("token");
  return queryOptions({
    queryKey: ["gatesGrid", token],
    queryFn: getGates,
  });
};

export const useGates= () => {
  return useQuery({
    ...getGatesQueryOptions(),
  });
};
