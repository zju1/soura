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
  RiApps2Line,
  RiBarChartLine,
  RiBox1Line,
  RiBuilding2Line,
  RiQuestionLine,
  RiSettingsLine,
  RiBardLine,
} from "@remixicon/react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: RiBarChartLine,
    },
    {
      title: "Saved suppliers",
      url: "/suppliers",
      icon: RiBox1Line,
    },
    {
      title: "Saved buyers",
      url: "/buyers",
      icon: RiBuilding2Line,
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
  documents: [
    {
      name: "AI Sourcing agent",
      url: "/ai-sourcing-agent",
      icon: RiBardLine,
    },
    {
      name: "Integrations",
      url: "/integrations",
      icon: RiApps2Line,
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
                <RiBardLine className="size-12" />
                <span className="text-base font-semibold">Sourcing Agent</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-2">
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
