import { ChevronRight } from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import type { SideNavigationItem } from "./app-sidebar";

type ComponentProps = {
  items: SideNavigationItem[];
};

export function NavMain({ items }: ComponentProps) {
  const location = useLocation();
  const { toggleSidebar, isMobile } = useSidebar();

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
                    {item.icon && <item.icon color="var(--color-primary)" />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto text-primary transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                ) : (
                  <NavLink to={item.to}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        "w-full p-2! flex items-start justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground! h-8 text-sm",
                        currentPath.endsWith(item.to) || handleIsActive(item.to)
                          ? "bg-muted text-primary font-medium hover:text-primary!"
                          : ""
                      )}
                      onClick={() => isMobile && toggleSidebar()}
                    >
                      {item.icon && <item.icon color="var(--color-primary)" />}
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
                            <SidebarMenuSubButton
                              onClick={() => isMobile && toggleSidebar()}
                              asChild
                            >
                              <NavLink
                                key={subItem.title}
                                to={subItem.to}
                                end={subItem.title !== "Discussions"}
                                className={cn(
                                  currentPath.endsWith(subItem.to) ||
                                    handleIsActive(subItem.to)
                                    ? "bg-sidebar-primary text-primary-foreground! font-medium hover:text-primary!"
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
