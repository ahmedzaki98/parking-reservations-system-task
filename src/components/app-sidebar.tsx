"use client";

import * as React from "react";
import { LandPlot, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Playground",
      to: "",
      icon: SquareTerminal,
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <span className="text-xl font-bold ps-2 p-2">
          {state === "collapsed" ? "PS" : "Parking System"}
        </span>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
