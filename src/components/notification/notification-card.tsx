import { WSMessage } from "@/lib/websocket-store";
import { CheckCheck, Mail } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  messages: WSMessage[];
  markAsRead: (id: string) => void;
}

const NotificationCard = ({ messages, markAsRead }: Props) => {

  return (
    <div className="p-2  h-full flex flex-col items-start justify-center gap-2">
      <h1 className="text-primary border-b border-muted-foreground w-full">
        Notifications
      </h1>
      {messages && messages.length > 0 ? (
        messages?.map((message) => (
          <div className="flex bg-background p-1 py-2 items-start justify-start gap-2 rounded-lg w-full">
            <Mail className="text-primary-foreground size-6" />
            <div className="flex flex-col w-full items-start justify-center gap-0">
              <div className="flex items-start justify-between w-full">
                <h3 className="font-bold text-primary">
                  {message.type === "zone-update" && "Zone Update"}
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => markAsRead(message.id ?? "")}
                  className="mx-2 size-7 hover:bg-primary-foreground"
                >
                  <CheckCheck className="size-5 text-primary" />
                </Button>
              </div>
              <div className="flex flex-col w-full items-start justify-center gap-0.5">
                <span className="text-xs">
                  <strong>zone :</strong> {message.payload.name}
                </span>
                <span className="text-xs">
                  <strong>gates :</strong>{" "}
                  {Array.isArray(message?.payload?.gateIds)
                    ? message?.payload?.gateIds?.join(", ")
                    : message?.payload?.gateIds}
                </span>
                <span className="text-xs">
                  <strong>category : </strong>
                  {message?.payload?.categoryId?.replace("cat_", "")}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-24 w-full flex items-center justify-center">
          <h2 className="text-primary">No notifications</h2>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
