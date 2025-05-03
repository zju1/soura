import { AuthGuard } from "@/app/guard/AuthGuard";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset className="h-[calc(100dvh-1rem)] bg-white grid grid-rows-[auto_1fr] overflow-hidden">
          <SiteHeader />
          <div
            className="overflow-auto"
            style={{
              scrollbarColor: "#414141 #F5F5F4",
            }}
          >
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
