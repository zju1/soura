"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { RiChatAiLine, RiHistoryLine } from "@remixicon/react";
import { useGetChatsQuery } from "@/app/store/services/chat.service";

export function NavDocuments() {
  const { data } = useGetChatsQuery();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <NavLink
              to="/"
              className="!rounded-full  aria-[current=page]:font-semibold"
            >
              <RiChatAiLine />
              <span>Home</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <NavLink
              to="/history"
              className="!rounded-full  aria-[current=page]:font-semibold"
            >
              <RiHistoryLine />
              <span>History</span>
            </NavLink>
          </SidebarMenuButton>
          <SidebarMenuSub>
            {(data || []).slice(0, 5)?.map((chat) => (
              <SidebarMenuSubItem key={chat._id}>
                <SidebarMenuSubButton asChild>
                  <NavLink
                    to={`/c/${chat._id}`}
                    className="!rounded-full  aria-[current=page]:font-semibold"
                  >
                    <span>{chat.title}</span>
                  </NavLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <NavLink
                  to={`/history`}
                  className="!rounded-full  font-semibold underline"
                >
                  View all
                </NavLink>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
