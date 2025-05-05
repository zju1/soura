import { Markdown } from "@/components/markdown";
import type { Message } from "@ai-sdk/react";

export function AIMessage({ parts }: Message) {
  return (
    <div className="flex justify-start">
      <div className="font-grotesk leading-8 grid p-4 gap-4 bg-stone-200 rounded-2xl rounded-bl-none">
        {parts?.map((part) => {
          switch (part.type) {
            case "text":
              return <Markdown key={part.type}>{part.text}</Markdown>;
            case "tool-invocation":
              {
                switch (part.toolInvocation.toolName) {
                  case "supplierTool": {
                    if (part.toolInvocation.state === "call") {
                      return (
                        <h1
                          key={part.type}
                          className="font-grotesk text-blue-600 animate-pulse"
                        >
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
    </div>
  );
}
