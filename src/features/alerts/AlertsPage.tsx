import { Segmented } from "antd";
import { useSearchParams } from "react-router-dom";
import { ReceivedAlertsPage } from "./received/ReceivedAlertsPage";
import { ActiveAlertsList } from "./list/ActiveAlertsPage";

export function AlertsPage() {
  const [params, setParams] = useSearchParams(
    new URLSearchParams({ active: "received" })
  );
  const value = params.get("active");

  return (
    <div className="p-4 grid gap-4 max-w-3xl mx-auto">
      <Segmented
        block
        size="large"
        className="bg-gray-200"
        value={value}
        onChange={(newValue) => {
          params.set("active", newValue!);
          setParams(params);
        }}
        options={[
          {
            label: "Received alerts",
            value: "received",
          },
          {
            label: "Active alerts",
            value: "active",
          },
        ]}
      />
      {value === "received" ? <ReceivedAlertsPage /> : <ActiveAlertsList />}
    </div>
  );
}
