import { api } from "@/lib/api-client";
import type { CategoriesEntity } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowToast from "@/components/ui/toast";

export const UpdateCategoriesRate = (
  Id: string
): Promise<{
  data: CategoriesEntity[];
}> => {
  return api.put(`/admin/categories/${Id}`);
};

export const useUpdateCategoriesRate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categoriesGrid"],
      });
      ShowToast({ type: "success", message: "category updated successfully" });
    },
    onError: () => {
      ShowToast({ type: "error", message: "Something went wrong" });
    },
    mutationFn: UpdateCategoriesRate,
  });
};
