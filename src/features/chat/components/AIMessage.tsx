import type { Message } from "@ai-sdk/react";
import { RiSparklingFill } from "@remixicon/react";
import { RenderPart } from "./RenderPart";

export function AIMessage({ parts }: Message) {
  return (
    <div className="flex justify-start gap-4 pr-8">
      <div className="size-8 flex items-center justify-center border-stone-400 border rounded-full shrink-0">
        <RiSparklingFill className="size-4" />
      </div>
      <div className="grid gap-4">
        <div className="flex items-start gap-4">
          <div className="font-grotesk leading-8 grid rounded-2xl text-sm rounded-bl-none">
            {parts
              ?.filter((item) => item.type !== "step-start")
              .map((item) => (
                <RenderPart {...item} key={item.type} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
