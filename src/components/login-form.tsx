import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useState } from "react";
import { useSigninMutation } from "@/app/store/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/app/store/store.config";
import { setToken } from "@/app/store/slices/auth.slice";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { access_token } = useAuth();

  const { toast } = useToast();

  const [signin, { isLoading }] = useSigninMutation();

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const onSubmit = useCallback(async () => {
    try {
      const response = await signin({
        password,
        username,
      }).unwrap();
      dispatch(setToken(response.accessToken));
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("invalidCredentials"),
      });
      console.log(error);
    }
  }, [signin, password, username, dispatch, toast, t]);

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col items-center gap-0 text-center">
        <h1 className="text-2xl font-bold font-sans text-stone-700">
          Login with an account
        </h1>
        <p className="text-balance text-sm text-stone-400">
          Enter your username below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="username"
            placeholder="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full mt-4">
          Login
        </Button>
        {/* Terms agree links and reminder like by clicking login you agree etc.*/}
        <p className="text-sm text-stone-500 text-center">
          By clicking login, you agree to our{" "}
          <a href="#" className="text-stone-700 underline font-semibold">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-stone-700 underline font-semibold">
            Privacy Policy
          </a>
        </p>
      </div>
    </form>
  );
}
