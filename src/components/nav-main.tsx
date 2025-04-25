import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink /* useNavigate */ } from "react-router-dom";
import {
  /* RiSearchLine ,*/ type RemixiconComponentType,
} from "@remixicon/react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: RemixiconComponentType;
  }[];
}) {
  // const navigate = useNavigate();

  return (
    <SidebarGroup className="pt-0">
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={() => navigate("/search")}
              tooltip="Search"
              className="!text-stone-600 font-semibold border border-stone-300 duration-200 ease-linear bg-white text-center justify-center"
            >
              <RiSearchLine />
              <span>Search</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <NavLink
                  to={item.url}
                  className="!rounded-full aria-[current=page]:font-semibold"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
