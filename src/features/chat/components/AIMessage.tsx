import { Markdown } from "@/components/markdown";
import type { Message } from "@ai-sdk/react";

export function AIMessage({ parts }: Message) {
  return (
    <div className="font-grotesk leading-8 grid gap-4">
      {parts?.map((part) => {
        switch (part.type) {
          case "text":
            return <Markdown>{part.text}</Markdown>;
          case "tool-invocation":
            {
              switch (part.toolInvocation.toolName) {
                case "supplierTool": {
                  if (part.toolInvocation.state === "call") {
                    return (
                      <h1 className="font-grotesk font-bold animate-pulse">
                        Searching...
                      </h1>
                    );
                  }
                  return;
                }
              }
            }
            return;
        }
      })}
    </div>
  );
}
