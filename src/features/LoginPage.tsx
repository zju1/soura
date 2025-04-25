import { LoginForm } from "@/components/login-form";

export interface LoginDTO {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface AuthUser {
  username: string;
  firstName: string;
  lastName: string;
  role: "admin" | "manager";
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  _id: string;
}

export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/rome.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col  justify-center gap-4 p-6 md:p-10 bg-stone-200">
        <div className="w-full max-w-sm mx-auto grid gap-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
