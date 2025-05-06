import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `flex min-h-30 w-full items-center justify-between rounded-xl border border-stone-300
                   bg-white px-3 py-2 text-base shadow-sm transition-colorsfile:border-0
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
});
Textarea.displayName = "Textarea";

export { Textarea };
