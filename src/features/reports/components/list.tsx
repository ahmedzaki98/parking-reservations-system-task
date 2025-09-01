import { DataTable } from "@/components/ui/table/data-table";
import { useReports } from "../api/get";
import { CircleCheckBig, CircleX } from "lucide-react";

const Reports = () => {
  const { data } = useReports();
  const reports = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="m-auto flex w-[95vw] flex-col md:w-full">
      <h2 className="mb-8 text-lg font-semibold">Zones List</h2>
      <div className="flex gap-4 px-3 md:px-0">
        <DataTable
          columns={[
            {
              accessorKey: "name",
              header: "Zone Name",
              cell: ({ row }) => {
                const name = row?.original?.name;
                return <span>{name}</span>;
              },
            },
            {
              accessorKey: "availableForSubscribers",
              header: "Available for Subscribers",
              cell: ({ row }) => {
                const availableForSubscribers =
                  row?.original?.availableForSubscribers;
                return <span>{availableForSubscribers}</span>;
              },
            },
            {
              accessorKey: "availableForVisitors",
              header: "Available for Visitors",
              cell: ({ row }) => {
                const availableForVisitors =
                  row?.original?.availableForVisitors;
                return <span>{availableForVisitors}</span>;
              },
            },

            {
              accessorKey: "slots",
              header: "Slots",
              cell: ({ row }) => {
                const occupied = row?.original?.occupied;
                const totalSlots = row?.original?.totalSlots;
                return (
                  <span>
                    {occupied} / {totalSlots}
                  </span>
                );
              },
            },
            {
              accessorKey: "free",
              header: "Free",
              cell: ({ row }) => {
                const free = row?.original?.free;
                return <span>{free}</span>;
              },
            },
            {
              accessorKey: "reserved",
              header: "Reserved",
              cell: ({ row }) => {
                const reserved = row?.original?.reserved;
                return <span>{reserved}</span>;
              },
            },
            {
              accessorKey: "subscriberCount",
              header: "Subscribers",
              cell: ({ row }) => {
                const subscriberCount = row?.original?.subscriberCount;
                return <span>{subscriberCount}</span>;
              },
            },
            {
              accessorKey: "status",
              header: "Status",
              cell: ({ row }) => {
                const open = row?.original?.open;
                return (
                  <div className="border rounded-2xl border-muted text-sm w-fit py-1 text-muted-foreground px-1.5">
                    {open ? (
                      <span className="flex gap-1 items-center">
                        <CircleCheckBig className="size-4 text-green-400" />
                        Open
                      </span>
                    ) : (
                      <span className="flex gap-1 items-center">
                        <CircleX className="size-4 text-red-400" />
                        Closed
                      </span>
                    )}
                  </div>
                );
              },
            },
          ]}
          data={reports}
        />
      </div>
    </div>
  );
};

export default Reports;
