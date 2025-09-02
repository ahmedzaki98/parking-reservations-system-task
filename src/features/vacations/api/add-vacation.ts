import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowToast from "@/components/ui/toast";
import { ZonesEntity } from "@/features/zones/types";
import { removeEmptyKeys } from "@/utils/helper";
import { AxiosError } from "axios";
import { FormSchema } from "../components/add-vacation";

export const addVacation = (
  data: FormSchema
): Promise<{
  data: {
    data: ZonesEntity;
  };
}> => {
  const url = "/admin/vacations";
  const filteredData = removeEmptyKeys(data);

  return api.post(url, filteredData);
};

export const useAddVacation= (reset?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["test"],
      });

      ShowToast({
        type: "success",
        message: "you added a vacation successfully",
      });
      reset?.();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;

      ShowToast({
        type: "error",
        message: axiosError.response?.data?.message ?? error.message,
      });
    },
    mutationFn: addVacation,
  });
};
