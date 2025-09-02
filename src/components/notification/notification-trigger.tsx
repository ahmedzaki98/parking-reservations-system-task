import { useWebSocketStore } from "@/lib/websocket-store";

import { Bell } from "lucide-react";
import NotificationCard from "./notification-card";
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const NotificationTrigger = () => {
  const { messages, setMessages } = useWebSocketStore();
  const markAsRead = (id: string) => {
    console.log("id: ", id);
    const filteredMessages = messages.filter((msg) => msg.id !== id);
    setMessages(filteredMessages);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative">
              {messages.length > 0 ? (
                <>
                  <Bell className="text-primary" />
                  <span className="-top-1 absolute start-3 text-[10px] flex size-3 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                    {messages.length}
                  </span>
                </>
              ) : (
                <Bell className="text-primary"/>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-accent rounded-lg w-[80vw] md:w-[400px] min-h-[200px] max-h-[500px] p-2 hide-scrollbar border-muted"
            align="start"
            sideOffset={4}
          >
            <NotificationCard messages={messages} markAsRead={markAsRead} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NotificationTrigger;
