import { useParkingCategories } from "../api/get";
import { DataTable } from "@/components/ui/table/data-table";
import { Button } from "@/components/ui/button";
import { getInitialColumnVisibility } from "@/utils/helper";
import { useAuthStore } from "@/lib/auth.store";
import { useUpdateCategoriesRate } from "../api/change-status";
import { useWebSocketStore } from "@/lib/websocket-store";

const CategoriesList = () => {
  const { user } = useAuthStore();
  const { data } = useParkingCategories();
  const { subscribeToGate } = useWebSocketStore();

  const zones = Array.isArray(data?.data) ? data.data : [];

  const tableRoles = getInitialColumnVisibility(
    ["employee"],
    {
      name: true,
      rateNormal: true,
      rateSpecial: true,
    },
    ["actions"],
    user?.role
  );

  const markZoneOpenCloseMutation = useUpdateCategoriesRate();

  const handleUpdateCategoryRate = (id: string, gateId: string) => {
    markZoneOpenCloseMutation.mutate(id);
    subscribeToGate(gateId);
  };

  return (
    <div className="m-auto flex flex-col w-full">
      <h2 className="mb-8 text-lg font-semibold">Parking Categories</h2>
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
            accessorKey: "rateNormal",
            header: "Normal Rate",
            cell: ({ row }) => {
              const rateNormal = row?.original?.rateNormal;
              return <span>{rateNormal}</span>;
            },
          },
          {
            accessorKey: "rateSpecial",
            header: "Special Rate",
            cell: ({ row }) => {
              const rateSpecial = row?.original?.rateSpecial;
              return <span>{rateSpecial}</span>;
            },
          },
          {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
              const gateId = row?.original?.id;
              return (
                <Button
                  variant="outline"
                  className="text-white px-3 py-1 rounded-xl"
                  onClick={() =>
                    handleUpdateCategoryRate(row.original.id, gateId)
                  }
                >
                  Update
                </Button>
              );
            },
          },
        ]}
        data={zones}
      />
    </div>
  );
};

export default CategoriesList;
