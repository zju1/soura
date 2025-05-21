/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useParams, useSearchParams } from "react-router-dom";
import { useChat } from "@ai-sdk/react";
import type { Supplier } from "@/features/chat/components/SupplierTable";
import { useGetMessagesByChatIdQuery } from "@/app/store/services/chat.service";

export function useMessages() {
  const { access_token } = useAuth();
  const chatId = useParams().chatId!;
  const [sourcingResult, setSourcingResult] = useState<Supplier[] | null>(null);
  const { messages, append, data, setMessages } = useChat({
    api: `${import.meta.env.VITE_API_BASE_URL}/chat/message`,
    body: {
      chatId,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    onFinish(message) {
      const tool = message.parts?.find(
        (item) => item.type === "tool-invocation"
      );
      if (
        tool &&
        tool.type === "tool-invocation" &&
        tool.toolInvocation.state === "result" &&
        tool.toolInvocation.toolName === "supplierFinder"
      ) {
        setSourcingResult(tool.toolInvocation.result);
      }
    },
  });
  const [params, setParams] = useSearchParams();
  const initial = params.get("initialMessage");
  const { data: oldMessages } = useGetMessagesByChatIdQuery(chatId);

  useEffect(() => {
    if (oldMessages) {
      setMessages(oldMessages.map((item) => item.message));
      setTimeout(() => {
        if (initial && initial.length > 0) {
          append({
            content: initial,
            role: "user",
          });
          params.delete("initialMessage");
          setParams(params);
        }
      }, 100);
    }
  }, [oldMessages]);

  const handleSubmit = useCallback(
    (content: string) => {
      append({
        content,
        role: "user",
      });
    },
    [append]
  );

  return {
    messages,
    handleSubmit,
    data,
    sourcingResult,
    setSourcingResult,
  };
}
