import { Option } from "@/types";
import { useEffect, useState } from "react";
import { useZonesByGate } from "../api/get-zone-by-gateId";
import { ZonesEntity } from "@/features/zones/types";

const useZoneByGateOptions = (gateId?: string) => {
  const [zonesOptions, setZonesOptions] = useState<Option[]>([]);

  const { data: zones, isLoading: zonesLoading } = useZonesByGate(gateId ?? "");

  useEffect(() => {
    if (zones) {
      setZonesOptions(
        zones?.data?.map((item: ZonesEntity) => ({
          label: item.name,
          value: item?.id,
        }))
      );
    } else {
      setZonesOptions([]);
    }
  }, [zones]);

  return { zonesOptions, zonesLoading, zones };
};

export default useZoneByGateOptions;
