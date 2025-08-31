import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { CategoriesEntity } from "../types";

export const getParkingCategories = (): Promise<{ data: CategoriesEntity[] }> => {
  return api.get("/master/categories");
};

export const getParkingCategoriesQueryOptions = () => {
  const token = localStorage.getItem("token");
  return queryOptions({
    queryKey: ["categoriesGrid", token],
    queryFn: getParkingCategories,
  });
};

export const useParkingCategories = () => {
  return useQuery({
    ...getParkingCategoriesQueryOptions(),
  });
};
