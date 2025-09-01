import { useWebSocketStore } from "@/lib/websocket-store";

import { Bell } from "lucide-react";
import NotificationCard from "./notification-card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

const NotificationTrigger = () => {
  const { messages } = useWebSocketStore();

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="relative">
          {messages.length > 0 ? (
            <>
              <Bell />
              <span className="-top-1 absolute start-3 text-[10px] flex size-3 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                {messages.length}
              </span>
            </>
          ) : (
            <Bell />
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="bg-accent w-[400px] h-[500px] p-0 border-0 overflow-y-auto">
        
        <NotificationCard messages={messages} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default NotificationTrigger;
