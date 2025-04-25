import * as React from "react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import {
  RiBarChartLine,
  RiBox1Line,
  RiQuestionLine,
  RiSettingsLine,
  RiChatAiLine,
} from "@remixicon/react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  documents: [
    {
      name: "Home",
      url: "/",
      icon: RiChatAiLine,
    },
  ],
  navMain: [
    {
      title: "Statistics",
      url: "/statistics",
      icon: RiBarChartLine,
    },
    {
      title: "Saved organizations",
      url: "/suppliers",
      icon: RiBox1Line,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: RiSettingsLine,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: RiQuestionLine,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <NavLink to="/">
                <img
                  src="/logo.svg"
                  className="h-[25px] object-contain"
                  alt=""
                />
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-2 gap-0">
        <NavDocuments />
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
