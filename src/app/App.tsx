import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.config";
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ConfigProvider } from "antd";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";
import { registerAllModules } from "handsontable/registry";

registerAllModules();

export function App() {
  return (
    <Suspense>
      <ConfigProvider
        typography={{
          style: {
            fontFamily: "Inter Variable, sans-serif",
          },
        }}
        theme={{
          token: {
            colorPrimary: "#1f1f1f",
            boxShadow: "none",
            borderRadius: 5,
          },
          components: {
            Card: {
              colorBorderSecondary: "#eee",
              boxShadowSecondary: "0 2px 10px rgba(0,0,0,0.2)",
            },
            Table: {
              rowSelectedBg: "#e5e5e5",
              rowHoverBg: "#f5f5f5",
            },
            Button: {
              primaryShadow: "none",
              controlOutline: "none !important",
              boxShadow: "none !important",
              boxShadowSecondary: "none",
              boxShadowTertiary: "none",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: "500",
            },
            Input: {
              controlOutline: "none",
            },
            Select: {
              controlOutline: "none",
              optionActiveBg: "#eee",
              optionSelectedBg: "#ddd",
            },
            InputNumber: {
              controlOutline: "none",
            },
            Switch: {
              controlOutline: "none",
            },
            Menu: {
              itemSelectedBg: "#ddd",
            },
            Dropdown: {
              controlItemBgActive: "#ddd",
            },
          },
        }}
      >
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RouterProvider router={router} />
            <Toaster />
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </Suspense>
  );
}
