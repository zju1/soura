import BuyersLeadsDatabase from "@/features/BuyersPage";
import Dashboard from "@/features/Dashboard";
import SourcingAgent from "@/features/SourcingAgent";
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
        index: true,
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
        path: "/ai-sourcing-agent",
        element: <SourcingAgent />,
      },
    ],
  },
]);
