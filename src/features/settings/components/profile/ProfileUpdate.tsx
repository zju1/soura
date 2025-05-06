import {
  useLazyGetMeQuery,
  useUpdateProfileMutation,
} from "@/app/store/services/auth.service";
import { setUser } from "@/app/store/slices/auth.slice";
import { useAppDispatch } from "@/app/store/store.config";
import { useAuth } from "@/hooks/useAuth";
import { Button, Form, Input, Modal, notification } from "antd";
import { useCallback } from "react";

export interface UpdateDTO {
  firstName: string;
  lastName: string;
  id: string;
}

export function ProfileUpdate({ onClose }: { onClose: VoidFunction }) {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [update, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const [getMe, { isFetching }] = useLazyGetMeQuery();
  const dispatch = useAppDispatch();

  const loading = updateLoading || isFetching;

  const handleSubmit = useCallback(
    async (data: UpdateDTO) => {
      const body: UpdateDTO = {
        ...data,
        id: user!._id,
      };

      await update(body).unwrap();
      const newUser = await getMe({}).unwrap();
      dispatch(setUser(newUser));
      notification.success({ message: "Profile updated successfully!" });
      onClose();
    },
    [dispatch, getMe, onClose, update, user]
  );

  return (
    <Modal open onCancel={onClose} footer={null}>
      <div className="grid gap-6">
        <h1 className="font-grotesk text-xl font-bold">Update your profile</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
          }}
        >
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Form.Item
                name="firstName"
                label="First name"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last name"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input size="large" />
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
