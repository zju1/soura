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
import { MaryLayout } from "@/layout/MaryLayout";
import { MarySearchPage } from "@/features/agets/mary/search/MarySearchPage";
import { MarySearchResultsPage } from "@/features/agets/mary/search/MarySearchResultsPage";
import { MaryMatchingPage } from "@/features/agets/mary/matching/MaryMatchingPage";

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
    path: "/mary",
    element: <MaryLayout />,
    children: [
      {
        path: "search",
        element: <MarySearchPage />,
      },
      {
        path: "search/:searchId",
        element: <MarySearchResultsPage />,
      },
      {
        path: "matching",
        element: <MaryMatchingPage />,
      },
      {
        path: "matching/:searchId",
        element: <MaryMatchingPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);
