import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NotificationTrigger from "../notification/notification-trigger";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <NotificationTrigger />
          </div>
        </header>
          <main className="@container/main flex flex-1 flex-col gap-4">
            {children}
          </main>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
