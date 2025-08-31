import { api } from "@/lib/api-client";
import type { ZonesEntity } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowToast from "@/components/ui/toast";

export const markZoneOpenClose = (data: {
  id: string;
}): Promise<{
  data: {
    data: ZonesEntity;
  };
}> => {
  const url = `/admin/zones/${data.id}/open`;
  return api.put(url);
};

export const useMarkZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["zonesGrid"],
      });

      ShowToast({
        type: "success",
        message: "The process completed successfully",
      });
    },
    onError: () => {
      ShowToast({
        type: "error",
        message: "Something went wrong",
      });
    },
    mutationFn: markZoneOpenClose,
  });
};
