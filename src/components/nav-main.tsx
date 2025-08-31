import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    to: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      to: string;
    }[];
  }[];
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  const parts = currentPath?.split("/");
  const activeCurrentPath = parts[2];

  const handleIsActive = (link: string) => {
    const finalLink = link?.split("/")[2];
    if (finalLink === activeCurrentPath) {
      return true;
    }
    return false;
  };
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items?.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={
              handleIsActive(item.to) ||
              item.items?.some((subItem) => handleIsActive(subItem.to))
            }
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                {item?.items ? (
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                ) : (
                  <NavLink to={item.to}>
                    <SidebarMenuButton
                      className={cn(
                        "w-full p-2! flex items-start justify-start hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! h-8 text-sm",
                        currentPath.endsWith(item.to) ||
                          (handleIsActive(item.to)
                            ? "bg-sidebar-foreground text-primary-foreground! font-medium hover:text-primary!"
                            : "")
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </NavLink>
                )}
              </CollapsibleTrigger>
              {item.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map(
                      (subItem) =>
                        subItem && (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <NavLink
                                key={subItem.title}
                                to={subItem.to}
                                end={subItem.title !== "Discussions"}
                                className={cn(
                                  currentPath.endsWith(subItem.to) ||
                                    handleIsActive(subItem.to)
                                    ? "bg-sidebar-foreground text-primary-foreground! font-medium hover:bg-sidebar-foreground hover:text-transparent"
                                    : ""
                                )}
                              >
                                {subItem.title}
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
