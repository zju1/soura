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
import { useGetChatsQuery } from "@/app/store/services/chat.service";
import {
  RiBuilding4Fill,
  RiChatHistoryFill,
  RiHomeFill,
  RiNotificationFill,
  RiSettings5Fill,
} from "@remixicon/react";
import { useHotkeys } from "react-hotkeys-hook";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: RiHomeFill,
    },
    {
      title: "Organizations",
      url: "/organizations",
      icon: RiBuilding4Fill,
    },
    {
      title: "Alerts",
      url: "/alerts",
      icon: RiNotificationFill,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  useHotkeys("ctrl+i", goHome);

  const { data: chats } = useGetChatsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const navItems = React.useMemo(
    () => [
      ...data.navMain,
      {
        title: "History",
        url: "/history",
        icon: RiChatHistoryFill,
        children: chats?.map((chat) => ({
          title: chat.title,
          url: `/c/${chat._id}`,
        })),
      },
    ],
    [chats]
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
        <div className="px-2 grid pb-4 pt-2">
          <button
            onClick={() => navigate("/")}
            className="bg-white rounded-full py-1.5 font-grotesk text-sm border-stone-200 border-[1.5px] font-medium flex justify-between items-center px-4"
          >
            <span>New chat</span>
            <div className="flex items-center justify-end gap-1">
              <kbd className="px-1  text-[10px] font-mono font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded">
                Ctrl
              </kbd>
              <kbd className="px-1  text-[10px] font-mono font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded">
                I
              </kbd>
            </div>
          </button>
        </div>
        <NavMain items={navItems} />
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
