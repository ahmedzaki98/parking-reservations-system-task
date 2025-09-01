import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowToast from "@/components/ui/toast";
import { ZonesEntity } from "@/features/zones/types";
import type{ AxiosError } from "axios";

export const checkOut = (data: {
  id: string;
}): Promise<{
  data: {
    data: ZonesEntity;
  };
}> => {
  const url = "/tickets/checkout";
  const filteredData = {
    ticketId: data.id,
    forceConvertToVisitor: true,
  };
  return api.post(url, filteredData);
};

export const useCheckOut = (reset?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess:async () => {
      await queryClient.invalidateQueries({
        queryKey: ["subscriptionsView"],
      });
      await queryClient.invalidateQueries({
        queryKey: ['subscriptionsGrid'],
      });

      ShowToast({
        type: "success",
        message: "you checked out successfully",
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
    mutationFn: checkOut,
  });
};
