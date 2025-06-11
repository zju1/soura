import { AuthGuard } from "@/app/guard/AuthGuard";
import { MarySidebar } from "@/components/mary-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function MaryLayout() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <MarySidebar variant="inset" />
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
