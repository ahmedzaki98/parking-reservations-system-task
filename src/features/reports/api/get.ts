import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ReportsEntity } from "../types";

export const getReports = (): Promise<{ data: ReportsEntity[] }> => {
  return api.get("/admin/reports/parking-state");
};

export const getReportsQueryOptions = () => {
  const token = localStorage.getItem("token");
  return queryOptions({
    queryKey: ["reports", token],
    queryFn: getReports,
  });
};

export const useReports = () => {
  return useQuery({
    ...getReportsQueryOptions(),
  });
};
