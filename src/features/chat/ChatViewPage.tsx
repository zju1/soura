import { useMessages } from "@/hooks/useChat";
import { ChatComposer } from "./components/ChatComposer";
import { AssistantMessage } from "./components/AssistantMessage";
import { UserMessage } from "./components/UserMessage";
import { useEffect, useRef } from "react";
import { SupplierTable } from "./components/SupplierTable";

export function ChatViewPage() {
  const { messages, handleSubmit, data, sourcingResult, setSourcingResult } =
    useMessages();
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={`grid ${sourcingResult && "grid-cols-2"} h-full max-h-dvh`}>
      <div className="grid grid-rows-[1fr_auto] max-h-dvh h-full overflow-auto">
        <div className="overflow-y-auto">
          <div className="p-8 grid content-start gap-6 max-w-4xl mx-auto">
            {messages.map((message, index) =>
              message.role === "assistant" ? (
                <AssistantMessage
                  key={`${message.id}-ai-${index}`}
                  {...message}
                  extra={data}
                  setSourcingResult={setSourcingResult}
                />
              ) : (
                <UserMessage key={`${message.id}-user-${index}`} {...message} />
              )
            )}
          </div>
          <div className="mb-12" ref={messagesRef}></div>
        </div>
        <div className="sticky bottom-0 bg-white p-4">
          <div className="max-w-4xl mx-auto">
            <ChatComposer onSend={handleSubmit} />
          </div>
        </div>
      </div>
      {sourcingResult && (
        <SupplierTable
          result={sourcingResult.map((item, index) => ({
            ...item,
            id: index + 1,
          }))}
        />
      )}
    </div>
  );
}
