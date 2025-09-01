import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowToast from "@/components/ui/toast";
import { ZonesEntity } from "@/features/zones/types";
import { removeEmptyKeys } from "@/utils/helper";
import type{ AxiosError } from "axios";

export const checkIn = (data: {
  gateId?: string;
  zoneId?: string;
  type?: string;
  subscriptionId: string | undefined;
}): Promise<{
  data: {
    data: ZonesEntity;
  };
}> => {
  const url = "/tickets/checkin";
  const filteredData = removeEmptyKeys(data);

  return api.post(url, filteredData);
};

export const useCheckIn = (reset?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["subscriptionsView"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["subscriptionsGrid"],
      });

      ShowToast({
        type: "success",
        message: "you checked in successfully",
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
    mutationFn: checkIn,
  });
};
