import type { PropsWithChildren, ReactNode } from "react";

export function Page({
  title,
  children,
  extra,
}: PropsWithChildren<{ title: ReactNode | string; extra?: ReactNode }>) {
  return (
    <div className="p-4 lg:p-6 grid gap-4">
      <div className="flex items-center justify-between">
        {typeof title === "string" ? (
          <h1 className="font-extrabold font-grotesk text-2xl">{title}</h1>
        ) : (
          title
        )}
        {extra}
      </div>
      <div>{children}</div>
    </div>
  );
}
