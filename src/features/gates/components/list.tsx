import { useGates } from "../api/get";
import { DataTable } from "@/components/ui/table/data-table";
import { useGatesStore } from "../store/gates.store";

const GatesList = () => {
  const { data, refetch } = useGates();
  const gates = Array.isArray(data?.data) ? data.data : [];
  const { page, setPage } = useGatesStore();
  const paginatedData = gates.slice((page - 1) * 10, page * 10);

  return (
    <div className="m-auto flex w-[95vw] flex-col md:w-full">
      <h2 className="mb-8 text-lg font-semibold">Parking Gates</h2>
      <div className="flex gap-4 px-3 md:px-0">
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
                const gateIds = row?.original?.zoneIds;
                return <span>{gateIds.join(", ")}</span>;
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
          data={paginatedData}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default GatesList;
