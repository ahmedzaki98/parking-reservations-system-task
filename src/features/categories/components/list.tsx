import { useParkingCategories } from "../api/get";
import { DataTable } from "@/components/ui/table/data-table";
import { Button } from "@/components/ui/button";
import { getInitialColumnVisibility } from "@/utils/helper";
import { useAuthStore } from "@/lib/auth.store";
import { useCategoriesStore } from "../store/categories.store";
import { useUpdateCategoriesRate } from "../api/change-status";

const CategoriesList = () => {
  const { user } = useAuthStore();
  const { data, refetch } = useParkingCategories();
  const zones = Array.isArray(data?.data) ? data.data : [];
  const { page, setPage } = useCategoriesStore();
  const paginatedData = zones.slice((page - 1) * 10, page * 10);

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

  const handleUpdateCategoryRate = (id: string) => {
    markZoneOpenCloseMutation.mutate(id);
  };

  return (
    <div className="m-auto flex w-[95vw] flex-col md:w-full">
      <h2 className="mb-8 text-lg font-semibold">Parking Categories</h2>
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
                return (
                  <Button
                    variant="outline"
                    className="text-white px-3 py-1 rounded-xl"
                    onClick={() => handleUpdateCategoryRate(row.original.id)}
                  >
                    Update
                  </Button>
                );
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

export default CategoriesList;
