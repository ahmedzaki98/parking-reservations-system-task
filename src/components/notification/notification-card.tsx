import { WSMessage } from "@/lib/websocket-store";
import { Mail } from "lucide-react";

interface Props {
  messages: WSMessage[];
}

const NotificationCard = ({ messages }: Props) => {
  console.log("messages: ", messages);
  return (
    <div className="p-2 flex flex-col items-start justify-center gap-1 ">
      {messages
        .filter((msg) => msg.type !== "admin-update")
        ?.map((message) => (
          <div className="flex p-1 py-2 items-start justify-start gap-2 rounded-lg bg-muted w-full">
            <Mail size={34} />
            <div className="flex flex-col items-start justify-center gap-0.5">
              <h2 className="mb-1 font-bold">
                {message.type === "zone-update" && "Zone Update"}
              </h2>
              <span className="text-sm">
                <strong>zone :</strong> {message.payload.name}
              </span>
              <span>
                <strong>gates :</strong>{" "}
                {Array.isArray(message?.payload?.gateIds)
                  ? message?.payload?.gateIds?.join(", ")
                  : message?.payload?.gateIds}
              </span>
              <span>
                <strong>category :</strong>
                {message.payload.categoryId.replace("cat_", "")}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NotificationCard;
