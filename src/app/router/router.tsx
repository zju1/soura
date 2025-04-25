import BuyersLeadsDatabase from "@/features/BuyersPage";
import { ChatHistoryPage } from "@/features/ChatHistoryPage";
import Dashboard from "@/features/Dashboard";
import { HelpPage } from "@/features/HelpPage";
import { IntegrationsPage } from "@/features/IntegrationsPage";
import { LoginPage } from "@/features/LoginPage";
import { ResultsPage } from "@/features/search/ResultsPage";
import { SearchLayout } from "@/features/search/SearchLayout";
import { SearchPage } from "@/features/search/SearchPage";
import { SettingsPage } from "@/features/SettingsPage";
import SourcingAgent from "@/features/SourcingAgent";
import { SourcingChat } from "@/features/SourcingChat";
import SupplierDatabase from "@/features/SuppliersPage";
import SupplierView from "@/features/SupplierView";
import { Layout } from "@/layout/Layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SourcingAgent />,
      },
      {
        path: "/c/:chatId",
        element: <SourcingChat />,
      },
      {
        path: "/history",
        element: <ChatHistoryPage />,
      },
      {
        path: "/statistics",
        element: <Dashboard />,
      },
      {
        path: "/suppliers",
        element: <SupplierDatabase />,
      },
      {
        path: "/suppliers/:id",
        element: <SupplierView />,
      },
      {
        path: "/buyers",
        element: <BuyersLeadsDatabase />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/integrations",
        element: <IntegrationsPage />,
      },
      {
        path: "/help",
        element: <HelpPage />,
      },

      {
        path: "/search",
        element: <SearchLayout />,
        children: [
          {
            index: true,
            element: <SearchPage />,
          },
          {
            path: "result",
            element: <ResultsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
]);
