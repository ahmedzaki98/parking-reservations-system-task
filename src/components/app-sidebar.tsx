import * as React from "react";
import {
  CalendarPlus,
  CircleParking,
  LandPlot,
  LayoutDashboard,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useAuthorization } from "@/lib/use-authorization";

export type SideNavigationItem = {
  title?: string;
  to: string;
  icon?: React.ElementType;
  items?: {
    title: string;
    to: string;
  }[];
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const { checkAccess } = useAuthorization();
  const navMain = [
    checkAccess({ allowRoles: ["admin"] }) && {
      title: "Reports",
      to: "/app/reports",
      icon: LayoutDashboard,
    },
    checkAccess({ allowRoles: ["admin"] }) && {
      title: "Subscriptions",
      to: "/app/subscriptions",
      icon: CalendarPlus,
    },
    {
      title: "Areas",
      to: "",
      icon: LandPlot,
      items: [
        {
          title: "Zones",
          to: "/app/zones",
        },
        {
          title: "Gates",
          to: "/app/gates",
        },
        {
          title: "Categories",
          to: "/app/categories",
        },
      ],
    },
    {
      title: "Operation",
      to: "",
      icon: CircleParking,
      items: [
        {
          title: "Check In",
          to: "/app/check-in",
        },
        {
          title: "Check Out",
          to: "/app/check-out",
        },
        checkAccess({ allowRoles: ["admin"] }) && {
          title: "Vacations",
          to: "/app/vacations",
        },
        checkAccess({ allowRoles: ["admin"] }) && {
          title: "Rush Hours",
          to: "/app/rush-hours",
        },
      ],
    },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <span className="text-xl text-primary font-bold ps-2 p-2">
          {state === "collapsed" ? "PS" : "Parking System"}
        </span>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
