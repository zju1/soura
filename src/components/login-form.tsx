import { useCallback } from "react";
import { useSigninMutation } from "@/app/store/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/app/store/store.config";
import { setToken } from "@/app/store/slices/auth.slice";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import type { LoginDTO } from "@/features/auth/AuthPage";

export function LoginForm() {
  const [form] = Form.useForm<LoginDTO>();
  const { access_token } = useAuth();

  const { toast } = useToast();

  const [signin, { isLoading }] = useSigninMutation();

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const onSubmit = useCallback(
    async (values: LoginDTO) => {
      try {
        const response = await signin(values).unwrap();
        dispatch(setToken(response.accessToken));
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("error"),
          description: t("invalidCredentials"),
        });
        console.log(error);
      }
    },
    [signin, dispatch, toast, t]
  );

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <div className="grid max-w-md mx-auto px-6 lg:px-0 py-6">
      <div className="flex flex-col justify-center h-full">
        <Form<LoginDTO>
          form={form}
          autoComplete="off"
          onFinish={onSubmit}
          className="grid gap-12"
          layout="vertical"
        >
          <img src="/logo.svg" className="h-10 mb-6" />
          <div className="grid gap-8">
            <div className="grid gap-2">
              <h1 className="font-bold text-2xl font-grotesk">
                Sign in to your account
              </h1>
              <p className="text-sm font-[450] text-gray-500 pr-8 font-sans">
                Not a member yet?{" "}
                <a href="#" className="underline">
                  Sign up now
                </a>{" "}
                and grow rapidly on your business
              </p>
            </div>
            <div className="grid gap-12">
              <div className="grid gap-6">
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: "Enter username" }]}
                >
                  <Input autoComplete="off" size="large" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Enter password" }]}
                >
                  <Input autoComplete="off" size="large" type="password" />
                </Form.Item>
              </div>
              <Button
                loading={isLoading}
                htmlType="submit"
                type="primary"
                size="large"
              >
                Sign in
              </Button>
            </div>
            <div>
              <p className="text-sm text-gray-400 text-center">
                By signing in to your Atlas account you agree to{" "}
                <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>{" "}
                of Atlas
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
