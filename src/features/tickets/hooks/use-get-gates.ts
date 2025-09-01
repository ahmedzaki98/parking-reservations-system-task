import { useGates } from "@/features/gates/api/get";
import { GatesEntity } from "@/features/gates/types";
import { Option } from "@/types";
import { useEffect, useState } from "react";

const useGateOptions = () => {
  const [gatesOptions, setGatesOptions] = useState<Option[]>([]);

  const { data: gates, isLoading: gatesLoading } = useGates();

  useEffect(() => {
    if (gates) {
      setGatesOptions(
        gates?.data?.map((item: GatesEntity) => ({
          label: item.name,
          value: item?.id,
        }))
      );
    } else {
      setGatesOptions([]);
    }
  }, [gates]);

  return { gatesOptions, gatesLoading, gates };
};

export default useGateOptions;
