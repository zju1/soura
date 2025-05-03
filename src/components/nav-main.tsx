import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { type LucideIcon } from "lucide-react";
import type { RemixiconComponentType } from "@remixicon/react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon | RemixiconComponentType;
    children?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup className="pt-0 pb-0 mb-0">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <NavLink
                  to={item.url}
                  className="!rounded-full aria-[current=page]:text-black text-gray-500 font-medium block py-[18px] text-[16px] font-grotesk"
                >
                  <item.icon className="!size-5" />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
              {item.children && item.children.length > 0 && (
                <SidebarMenuSub>
                  {(item.children || []).slice(0, 5)?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.url}>
                      <SidebarMenuSubButton asChild>
                        <NavLink
                          to={subItem.url}
                          className="!rounded-full aria-[current=page]:text-black text-stone-600 font-normal block py-[18px] text-[16px] font-grotesk"
                        >
                          <span>{subItem.title}</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
