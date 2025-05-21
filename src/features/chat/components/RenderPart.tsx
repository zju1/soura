import { type Message } from "@ai-sdk/react/";
import type { Supplier } from "./SupplierTable";

type MessagePart = NonNullable<Message["parts"]>[number];

export function RenderPart({
  onClick,
  ...props
}: MessagePart & { onClick: (value: Supplier[]) => void }) {
  switch (props.type) {
    case "tool-invocation":
      if (
        props.toolInvocation.state === "result" &&
        props.toolInvocation.toolName === "supplierFinder"
      ) {
        return (
          <div
            className="p-4 rounded-lg border inline-grid cursor-pointer select-none bg-gray-50 gap-2 mt-4  justify-self-start"
            onClick={() => onClick((props.toolInvocation as any).result)}
          >
            <h2 className="leading-4 font-bold text-lg"> Sourcing result</h2>
            <p className="leading-4 text-gray-600">
              Click to view all {props.toolInvocation.result.length} suppliers
            </p>
          </div>
        );
      }
      break;
    default:
      return null;
  }
}
