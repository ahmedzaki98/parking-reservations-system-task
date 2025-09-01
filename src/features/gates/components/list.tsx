import { useGates } from "../api/get";
import { DataTable } from "@/components/ui/table/data-table";

const GatesList = () => {
  const { data } = useGates();
  const gates = Array.isArray(data?.data) ? data.data : [];

  //  const subscribeToGateMutation = useSubscribeToGate();

  //   const handleSubscribeToGate = (id: string) => {
  //     subscribeToGateMutation.mutate(id);
  //   };
  return (
    <div className="m-auto flex flex-col w-full">
      <h2 className="mb-8 text-lg font-semibold">Parking Gates</h2>
        <DataTable
          columns={[
            {
              accessorKey: "name",
              header: "Name",
              cell: ({ row }) => {
                const name = row?.original?.name;
                return <span>{name}</span>;
              },
            },
            {
              accessorKey: "zoneIds",
              header: "Zone",
              cell: ({ row }) => {
                const zoneIds = row?.original?.zoneIds;
                return (
                  <>
                    {zoneIds &&
                      zoneIds.length > 0 &&
                      zoneIds?.map((zone, index) => {
                        return <li key={index}>{zone}</li>;
                      })}
                  </>
                );
              },
            },
            {
              accessorKey: "location",
              header: "Location",
              cell: ({ row }) => {
                const location = row?.original?.location;
                return <span>{location}</span>;
              },
            },
          ]}
          data={gates}
        />
      </div>
  );
};

export default GatesList;
