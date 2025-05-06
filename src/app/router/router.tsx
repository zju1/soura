import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/layout/Layout";

import { HomePage } from "@/features/HomePage";
import { ChatHistoryPage } from "@/features/chat/ChatHistoryPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { ChatViewPage } from "@/features/chat/ChatViewPage";
import { AuthPage } from "@/features/auth/AuthPage";
import { OrganizationViewPage } from "@/features/organizations/OrganizationViewPage";
import { OrganizationsPage } from "@/features/organizations/OrganizationsPage";
import { OrganizationFormPage } from "@/features/organizations/OrganizationFormPage";
import { AlertsPage } from "@/features/alerts/AlertsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/c/:chatId",
        element: <ChatViewPage />,
      },
      {
        path: "/history",
        element: <ChatHistoryPage />,
      },
      {
        path: "/organizations",
        element: <OrganizationsPage />,
      },
      {
        path: "/organizations/form",
        element: <OrganizationFormPage />,
      },
      {
        path: "/organizations/view/:id",
        element: <OrganizationViewPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/alerts",
        element: <AlertsPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);
