import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-xl border border-stone-300
          bg-white px-3 py-1 text-base shadow-sm transition-colorsfile:border-0
          file:bg-transparent file:text-sm file:font-medium file:text-stone-950
          placeholder:text-stone-500 focus-visible:outline-none focus-visible:bg-stone-100 focus-visible:border-stone-200 focus-visible:shadow-none
          disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors
         `,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
