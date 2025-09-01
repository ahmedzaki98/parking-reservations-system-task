import { useSubscriptions } from "../api/get";
import { DataTable } from "@/components/ui/table/data-table";
import dayjs from "dayjs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import { CircleCheckBig, CircleX, Eye } from "lucide-react";

const SubscriptionsList = () => {
  const { data } = useSubscriptions();

  const zones = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="m-auto flex flex-col w-full">
      <h2 className="mb-8 text-lg font-semibold">Subscriptions List</h2>
        <DataTable
          columns={[
            {
              accessorKey: "name",
              header: "Name",
              cell: ({ row }) => {
                const name = row?.original?.userName;
                return <span>{name}</span>;
              },
            },
            {
              accessorKey: "category",
              header: "Category",
              cell: ({ row }) => {
                const category = row?.original?.category;
                return <span>{category?.replace("cat_", "")}</span>;
              },
            },
            {
              accessorKey: "startsAt",
              header: "Starts At",
              cell: ({ row }) => {
                const startsAt = row?.original?.startsAt;
                return (
                  <span>{dayjs(startsAt).format("YYYY-MM-DD HH:mm A")}</span>
                );
              },
            },
            {
              accessorKey: "expiresAt",
              header: "Expires At",
              cell: ({ row }) => {
                const expiresAt = row?.original?.expiresAt;
                return (
                  <span>{dayjs(expiresAt).format("YYYY-MM-DD HH:mm A")}</span>
                );
              },
            },
            {
              accessorKey: "cars",
              header: "Cars",
              cell: ({ row }) => {
                const cars = row?.original?.cars;
                return (
                  <div>
                    {cars &&
                      cars.length > 0 &&
                      cars?.map((car, index) => {
                        return (
                          <HoverCard key={index}>
                            <HoverCardTrigger className="cursor-pointer">
                              <li >{car.brand}</li>
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-muted px-3 py-2 w-fit">
                              <div className="flex items-center justify-center gap-3">
                                <div className="text-sm font-bold flex flex-col items-start text-primary-800">
                                  <span>plate</span>
                                  <span>color</span>
                                  <span>model</span>
                                </div>
                                <div className="text-sm flex flex-col items-start text-primary-700">
                                  <span>{car.plate}</span>
                                  <span>{car.color}</span>
                                  <span>{car.model}</span>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        );
                      })}
                  </div>
                );
              },
            },
            {
              accessorKey: "currentCheckins",
              header: "Check ins",
              cell: ({ row }) => {
                const currentCheckins = row?.original?.currentCheckins;
                return (
                  currentCheckins &&
                  currentCheckins.length > 0 &&
                  currentCheckins?.map((checkin, index) => (
                    <div key={index} className="flex gap-1">
                      <span>{checkin.ticketId}</span>
                      <span>
                        at{" "}
                        {dayjs(checkin.checkinAt).format("YYYY-MM-DD HH:mm A")}
                      </span>
                    </div>
                  ))
                );
              },
            },
            {
              accessorKey: "status",
              header: "Status",
              cell: ({ row }) => {
                const active = row?.original?.active;
                return (
                  <div className="border rounded-2xl border-muted text-sm w-fit py-1 text-muted-foreground px-1.5">
                    {active ? (
                      <span className="flex gap-1 items-center">
                        <CircleCheckBig className="size-4 text-green-400" />
                        active
                      </span>
                    ) : (
                      <span className="flex gap-1 items-center">
                        <CircleX className="size-4 text-red-400" />
                        inactive
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
                const id = row?.original?.id;
                return (
                  <Link to={`/app/subscriptions/view/${id}`}>
                    <Eye className="size-5" />
                  </Link>
                );
              },
            },
          ]}
          data={zones}
        />
    </div>
  );
};

export default SubscriptionsList;
