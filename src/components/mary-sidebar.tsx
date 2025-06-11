import * as React from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut } from "lucide-react";
import {
  RiArrowLeftLine,
  RiBarChartBoxFill,
  RiGroupFill,
  RiMailFill,
  RiMailSendFill,
  RiPriceTag3Fill,
  RiSearch2Fill,
  RiSettings5Fill,
  RiSettingsFill,
  RiUserSearchFill,
} from "@remixicon/react";

export function MarySidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const productItems = React.useMemo(
    () => [
      {
        title: "AI search",
        url: "/mary/search",
        icon: RiSearch2Fill,
      },
      {
        title: "AI matching",
        url: "/mary/matching",
        icon: RiUserSearchFill,
      },

      {
        title: "Outreach queue",
        url: "/mary/outreach-queue",
        icon: RiMailSendFill,
      },
      {
        title: "Quote tracker",
        url: "/mary/quote-tracker",
        icon: RiPriceTag3Fill,
      },
      {
        title: "Analytics",
        url: "/mary/analytics",
        icon: RiBarChartBoxFill,
      },
      {
        title: "My emails",
        url: "/mary/emails",
        icon: RiMailFill,
      },
      {
        title: "My suppliers",
        url: "/mary/suppliers",
        icon: RiGroupFill,
      },
      {
        title: "Settings",
        url: "/mary/settings",
        icon: RiSettingsFill,
      },
    ],
    []
  );

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
                  src="/logo-mary.svg"
                  className="h-[25px] object-contain"
                  alt=""
                />
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-2 gap-0">
        <div className="px-4 grid mb-4">
          <button
            className="bg-brand-50 flex items-center gap-2 px-2 py-1.5 rounded-xl text-sm font-grotesk font-medium text-brand-400 border border-brand-200"
            onClick={() => navigate("/")}
          >
            <RiArrowLeftLine className="size-5" />
            <span>Back to main</span>
          </button>
        </div>
        <NavMain items={productItems} />
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="p-0 h-auto !ring-0">
              <Avatar>
                <AvatarFallback className="bg-stone-200">
                  {`${user?.firstName} ${user?.lastName}`
                    .split(" ")
                    .map((item) => item[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="font-grotesk flex-1">
                <h2 className="text-sm font-semibold leading-0">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-xs">{user?.role}</p>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[220px] mb-2 font-grotesk">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <RiSettings5Fill />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
