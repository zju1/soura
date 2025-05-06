import { Markdown } from "@/components/markdown";
import { type Message } from "@ai-sdk/react/";

type MessagePart = NonNullable<Message["parts"]>[number];

export function RenderPart(props: MessagePart) {
  switch (props.type) {
    case "text":
      return <Markdown>{props.text}</Markdown>;
    case "tool-invocation": {
      if (props.toolInvocation.state !== "result") {
        return (
          <h1 className="font-grotesk text-blue-600 animate-pulse">
            Searching...
          </h1>
        );
      }
      return;
    }
    default:
      return null;
  }
}
