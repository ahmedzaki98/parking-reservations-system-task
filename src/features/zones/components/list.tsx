import { useZones } from "../api/get";
import { DataTable } from "@/components/ui/table/data-table";
import { CircleCheckBig, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInitialColumnVisibility } from "@/utils/helper";
import { useAuthStore } from "@/lib/auth.store";
import { useMarkZone } from "../api/change-status";
import { cn } from "@/utils/cn";
import { useWebSocketStore } from "@/lib/websocket-store";

const ZonesList = () => {
  const { user } = useAuthStore();
  const { subscribeToGate } = useWebSocketStore();

  const { data } = useZones();
  const zones = Array.isArray(data?.data) ? data.data : [];

  const tableRoles = getInitialColumnVisibility(
    ["employee"],
    {
      name: true,
      categoryId: true,
      gateIds: true,
      slots: true,
      status: true,
    },
    ["actions"],
    user?.role
  );

  const markZoneOpenCloseMutation = useMarkZone();

  const handleMarkZoneOpenClose = (id: string, gateIds: string[]) => {
    markZoneOpenCloseMutation.mutate({ id });
    gateIds.map((gateId) => {
      subscribeToGate(gateId);
    });
  };

  return (
    <div className="m-auto flex w-[95vw] flex-col md:w-full">
      <h2 className="text-primary mb-8 text-lg font-semibold">Zones List</h2>
      <div className="flex gap-4 px-3 md:px-0">
        <DataTable
          tableRoles={tableRoles}
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
              accessorKey: "categoryId",
              header: "Category",
              cell: ({ row }) => {
                const categoryId = row?.original?.categoryId;
                return <span>{categoryId.replace("cat_", "")}</span>;
              },
            },
            {
              accessorKey: "gateIds",
              header: "Gates",
              cell: ({ row }) => {
                const gateIds = row?.original?.gateIds;
                return (
                  <>
                    {gateIds &&
                      gateIds.length > 0 &&
                      gateIds?.map((gate, index) => {
                        return <li key={index}>{gate}</li>;
                      })}
                  </>
                );
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
            {
              accessorKey: "actions",
              header: "Actions",
              cell: ({ row }) => {
                const open = row?.original?.open;
                const id = row?.original?.id;
                const gateIds = row?.original?.gateIds;

                return (
                  <Button
                    variant="outline"
                    className={cn(
                      "text-white px-3 py-1 rounded-xl",
                      open ? "hover:bg-red-500!" : "hover:bg-green-500!"
                    )}
                    onClick={() => handleMarkZoneOpenClose(id, gateIds)}
                  >
                    {open ? "Close" : "Open"}
                  </Button>
                );
              },
            },
          ]}
          data={zones}
        />
      </div>
    </div>
  );
};

export default ZonesList;
