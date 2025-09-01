import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { TicketEntity } from "../types";
import { useCheckOut } from "../../tickets/api/create-check-out";

type Props = {
  ticket?: TicketEntity;
};

const TicketView = ({ ticket }: Props) => {
  const checkOutMutation = useCheckOut();

  const handleCheckOut = (id: string) => {
    checkOutMutation.mutate({ id });
  };
  return (
    <div className="flex gap-6 bg-sidebar rounded-lg ">
      <div
        key={ticket?.id}
        className="text-gray-500 w-full shadow-md p-5 hover:shadow-lg transition"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold">{ticket?.type}</h2>

          {ticket?.checkinAt && (
            <Button
              onClick={() => handleCheckOut(ticket?.id ?? "")}
              className="text-xs font-medium px-2 py-1 rounded-lg"
            >
              {ticket?.checkinAt ? "Check Out" : "Check In"}
            </Button>
          )}
        </div>

        <p className="text-lg  mb-2">
          <span className="font-medium">Gate:</span>{" "}
          {ticket?.gateId?.replace("_", " ")}
        </p>
        <p className="text-lg  mb-2">
          <span className="font-medium">Zone:</span>{" "}
          {ticket?.zoneId?.replace("_", " ")}
        </p>

        <p className="text-lg mb-1">
          <span className="font-medium">Valid:</span>{" "}
          {dayjs(ticket?.checkinAt).format("YYYY-MM-DD HH:mm A")} →{" "}
          {ticket?.checkoutAt
            ? dayjs(ticket?.checkoutAt).format("YYYY-MM-DD HH:mm A")
            : "---"}
        </p>
      </div>
    </div>
  );
};

export default TicketView;
