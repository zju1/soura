import { Button, Modal, notification } from "antd";
import { useCallback, useState } from "react";
import { AlertForm, type SingleAlert } from "./form/AlertForm";
import {
  useDeleteAlertMutation,
  useGetAlertsQuery,
} from "@/app/store/services/api.service";

export const monitoringLevels = [
  {
    label: "Hourly",
    value: "h",
  },
  {
    label: "Daily",
    value: "d",
  },
  {
    label: "Weekly",
    value: "w",
  },
  {
    label: "Monthly",
    value: "m",
  },
];
export function ActiveAlertsList() {
  const [open, setOpen] = useState(false);
  const { data } = useGetAlertsQuery({});
  const [current, setCurrent] = useState<SingleAlert | null>(null);
  const [deleteAlert, { isLoading }] = useDeleteAlertMutation();

  const handleDelete = useCallback(
    async (id: string) => {
      Modal.confirm({
        title: "Warning",
        content:
          "Are you sure you want to delete this alert? This action cannot be reverted.",
        onOk: async () => {
          await deleteAlert(id).unwrap();
          notification.success({
            message: "Alert deleted successfuly!",
          });
        },
      });
    },
    [deleteAlert]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-xl font-bold font-grotesk">Alert Management</h1>
          <p className="text-muted-foreground text-sm">
            Create and manage your monitoring alerts
          </p>
        </div>
        <Button onClick={() => setOpen(true)} type="primary">
          Create a new alert
        </Button>
      </div>
      {open && (
        <AlertForm
          initialData={current}
          onClose={() => {
            setOpen(false);
            setCurrent(null);
          }}
        />
      )}
      <div className="grid gap-2">
        {data?.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 pt-4 border rounded-md grid gap-4"
          >
            <div>
              <h1 className="font-grotesk text-2xl font-bold">{item.name}</h1>
              <p>{item.description}</p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">Organization:</span>
                <p className="text-sm font-semibold">{item.organizationName}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Interval:</span>
                <p className="text-sm font-semibold">
                  {
                    monitoringLevels.find(
                      (elem) => elem.value === item.monitoringLevel
                    )?.label
                  }
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                <p className="text-sm font-semibold">
                  {item.active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2 mt-2">
              <Button
                loading={isLoading}
                color="red"
                variant="outlined"
                onClick={() => handleDelete(item._id!)}
              >
                Delete
              </Button>
              <Button
                color="blue"
                variant="solid"
                onClick={() => {
                  setCurrent(item);
                  setOpen(true);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
