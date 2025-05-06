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
  organizationId?: string;
  _id: string;
}

export function AuthPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.5fr_1fr] 2xl:grid-cols-[2fr_1fr]">
      <div className="hidden bg-muted lg:grid bg-[url(/rome.jpg)] bg-no-repeat bg-cover bg-center">
        <div className="bg-gradient-to-b from-transparent to-black/80 flex items-end justify-start p-8">
          <figure className="max-w-screen-md mx-auto text-center">
            <svg
              className="w-10 h-10 mx-auto mb-3 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-2xl italic text-gray-100 dark:text-white font-grotesk">
                "If someone is able to show me that what I think or do is not
                right, I will happily change, for I seek the truth, by which no
                one was ever truly harmed. It is the person who continues in his
                self-deception and ignorance who is harmed"
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse font-grotesk">
              <cite className="pe-3 font-medium text-white">
                Marcus Aurelius
              </cite>
            </figcaption>
          </figure>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
