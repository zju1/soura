import {
  useCreateAlertMutation,
  useGetOrganizationsQuery,
  useUpdateAlertMutation,
} from "@/app/store/services/api.service";
import { Button, Form, Input, Modal, notification, Select, Switch } from "antd";
import { useCallback } from "react";

export interface SingleAlert {
  name: string;
  description: string;
  organization: string;
  monitoringLevel: string;
  active: boolean;
  _id?: string;
  organizationName?: string;
}

export function AlertForm({
  onClose,
  initialData,
}: {
  onClose: VoidFunction;
  initialData: SingleAlert | null;
}) {
  const { data } = useGetOrganizationsQuery({});
  const [createAlert, { isLoading: createLoading }] = useCreateAlertMutation();
  const [updateAlert, { isLoading: updateLoading }] = useUpdateAlertMutation();

  const loading = createLoading || updateLoading;

  const [form] = Form.useForm();

  const handleSubmit = useCallback(
    async (data: SingleAlert) => {
      if (initialData) {
        await updateAlert({ ...data, _id: initialData._id });
        notification.success({ message: "Alert updated successfully!" });
      } else {
        await createAlert(data).unwrap();
        notification.success({ message: "Alert created successfully!" });
      }
      onClose();
    },
    [createAlert, initialData, onClose, updateAlert]
  );

  return (
    <Modal open onCancel={onClose} footer={null}>
      <div className="grid gap-6">
        <h1 className="font-grotesk text-xl font-bold">
          {initialData ? "Update alert" : "Create a new alert"}
        </h1>
        <Form<SingleAlert>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={
            initialData
              ? {
                  name: initialData.name,
                  description: initialData.description,
                  organization: initialData.organization,
                  monitoringLevel: initialData.monitoringLevel,
                  active: initialData.active,
                }
              : {
                  name: "",
                  description: "",
                  organization: "",
                  monitoringLevel: "",
                  active: true,
                }
          }
        >
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Form.Item
                name="name"
                label="Alert name"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Alert description"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input.TextArea size="large" />
              </Form.Item>

              <Form.Item
                name="organization"
                label="Alert organization"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Select
                  showSearch
                  options={data?.map((item) => ({
                    label: item.name,
                    value: item._id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                name="monitoringLevel"
                label="Monitoring level"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Select
                  options={[
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
                  ]}
                />
              </Form.Item>
              <Form.Item name="active" label="Active">
                <Switch />
              </Form.Item>
            </div>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
