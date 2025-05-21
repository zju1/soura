import type { Message } from "@ai-sdk/react";
import { RiSparklingFill } from "@remixicon/react";
import { RenderPart } from "./RenderPart";
import { Process } from "./Process";
import { Markdown } from "@/components/markdown";
import type { Dispatch, SetStateAction } from "react";
import type { Supplier } from "./SupplierTable";

export function AssistantMessage({
  parts,
  extra,
  content,
  setSourcingResult,
}: Message & {
  extra: any[] | undefined;
  setSourcingResult: Dispatch<SetStateAction<Supplier[] | null>>;
}) {
  const process = extra?.at(-1);
  const toolCall = parts?.find((item) => item.type === "tool-invocation");
  const isAnalyzing =
    toolCall?.type === "tool-invocation" &&
    toolCall.toolInvocation.state === "call";

  return (
    <div className="flex justify-start gap-4 pr-8">
      <div className="size-8 flex items-center justify-center border-stone-400 border rounded-full shrink-0">
        <RiSparklingFill className="size-4" />
      </div>
      <div className="grid gap-4">
        <div className="flex items-start gap-4">
          <div className="font-grotesk leading-8 grid rounded-2xl text-sm rounded-bl-none">
            {isAnalyzing && process && <Process {...process} />}
            {content.length > 0 && <Markdown>{content}</Markdown>}
            {parts
              ?.filter((item) => item.type !== "step-start")
              .map((item) => (
                <RenderPart
                  {...item}
                  onClick={(value) => setSourcingResult(value)}
                  key={
                    item.type === "tool-invocation"
                      ? item.toolInvocation.toolCallId
                      : item.type
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
