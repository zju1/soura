import { Markdown } from "@/components/markdown";
import { type Message } from "@ai-sdk/react/";

type MessagePart = NonNullable<Message["parts"]>[number];
export function RenderPart(props: MessagePart) {
  switch (props.type) {
    case "text":
      return <Markdown>{props.text}</Markdown>;
    case "tool-invocation": {
      if (props.toolInvocation.state !== "result") {
        switch (props.toolInvocation.toolName) {
          case "singleSupplierResearch": {
            return (
              <h1 className="font-grotesk text-zinc-800 animate-pulse">
                Analyzing...
              </h1>
            );
          }
          default: {
            return (
              <h1 className="font-grotesk text-zinc-800 animate-pulse">
                Searching...
              </h1>
            );
          }
        }
      }
      return;
    }
    default:
      return null;
  }
}
