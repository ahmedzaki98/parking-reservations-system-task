import { NavLink, useParams } from "react-router-dom";
import { useSubscriptionsView } from "../api/view";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp, Undo2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useTicket } from "../api/get-ticket";
import { useState } from "react";
import TicketView from "./ticket-view";

const SubscriptionView = () => {
  const params = useParams();
  // const navigate = useNavigate();
  const id = params.id as string;
  const [gateId, setgateId] = useState<string | undefined>(undefined);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleOpen = (ticketId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };
  const { data, isLoading } = useSubscriptionsView(id);
  const subscription = data?.data;
  const { data: ticketData } = useTicket(gateId);
  const ticket = ticketData?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="m-auto flex flex-col w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold">Subscriptions Details</h2>
        <NavLink to="/app/subscriptions">
          <Undo2 size={24} />
        </NavLink>
      </div>
      <div className="flex gap-6">
        <div
          key={subscription?.id}
          className="text-gray-500 w-full border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-4xl font-semibold">{subscription?.userName}</h2>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                subscription?.active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {subscription?.active ? "Active" : "Inactive"}
            </span>
          </div>

          <p className="text-xl  mb-2">
            <span className="font-medium">Category:</span>{" "}
            {subscription?.category?.replace("cat_", "")}
          </p>

          <div className="mb-3">
            <p className="text-xl font-medium  mb-1">Cars:</p>
            <ul className="ps-5 text-xl space-y-1">
              {subscription?.cars?.map((car, index) => (
                <li key={index} className="ml-2 list-disc">
                  <span className="font-medium">{car.plate}</span> — {car.brand}{" "}
                  {car.model} ({car.color})
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xl mb-1">
            <span className="font-medium">Valid:</span>{" "}
            {dayjs(subscription?.startsAt).format("YYYY-MM-DD HH:mm A")} →{" "}
            {dayjs(subscription?.expiresAt).format("YYYY-MM-DD HH:mm A")}
          </p>
          <ul className="text-xl space-y-1">
            {subscription?.currentCheckins &&
              subscription.currentCheckins.length > 0 && (
                <p className="text-xl text-muted-foreground mt-2">
                  {subscription?.currentCheckins?.length} active check-in:
                  {subscription?.currentCheckins?.map((checkin, index) => (
                    <>
                      <Collapsible
                        key={checkin.ticketId || index}
                        open={!!openItems[checkin.ticketId]}
                        onOpenChange={() => toggleOpen(checkin.ticketId)}
                        className="flex flex-col gap-2"
                        title="open ticket"
                      >
                        <div className="flex items-center justify-between gap-4 px-4">
                          <CollapsibleTrigger
                            onClick={() => setgateId(checkin?.ticketId)}
                            asChild
                            className="cursor-pointer"
                          >
                            <li className="ml-5 list-disc" key={index}>
                              <p className="flex items-center gap-1 text-xl mb-1">
                                <span className="font-medium">
                                  Check in At:
                                </span>{" "}
                                {dayjs(checkin?.checkinAt).format(
                                  "YYYY-MM-DD HH:mm A"
                                )}
                                {openItems[checkin.ticketId] ? (
                                  <ChevronUp className="size-5 ms-5"/>
                                ) : (
                                  <ChevronDown className="size-5 ms-5"/>
                                )}
                                {/* <ChevronsUpDown className="size-5 ms-5" /> */}
                                {/* <Link
                                  to={`/app/subscriptions/ticket/${checkin?.ticketId}`}
                                >
                                </Link> */}
                              </p>
                            </li>
                          </CollapsibleTrigger>
                        </div>

                        <CollapsibleContent className="flex flex-col gap-2">
                          <TicketView ticket={ticket} />
                        </CollapsibleContent>
                      </Collapsible>
                    </>
                  ))}
                </p>
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
