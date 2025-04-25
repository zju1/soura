import {
  useGetMessagesByChatIdQuery,
  useSendMessageMutation,
} from "@/app/store/services/chat.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { /*  RiSearchLine,  */ RiSendPlaneFill } from "@remixicon/react";
// import { Search, Globe, BookOpen } from "lucide-react";
import Markdown from "react-markdown";
import { useCallback /* useState */, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import MermaidChart from "@/components/MermaidWrapper";
import { Loader } from "lucide-react";

export interface IChat {
  userId: string;
  createdAt: string;
  title: string;
  _id: string;
}

const extractMermaid = (markdown: string) => {
  const match = markdown.match(/```mermaid\n([\s\S]+?)```/);
  return match ? match[1].trim() : null;
};

const stripMermaid = (markdown: string) => {
  return markdown.replace(/```mermaid\n([\s\S]+?)```/, "");
};

export interface SingleMessage {
  chatId: string;
  content: string;
  createdAt: string;
  sender: "user" | "assistant";
  updatedAt: string;
  _id: string;
}

function AIMessage({ content }: { content: string }) {
  const chartCode = extractMermaid(content);
  const markdownWithoutMermaid = stripMermaid(content);

  return (
    <>
      <Markdown remarkPlugins={[remarkGfm]}>{markdownWithoutMermaid}</Markdown>
      {chartCode && <MermaidChart definition={chartCode} />}
    </>
  );
}

export function SourcingChat() {
  // const [searchMode, setSearchMode] = useState<"search" | "sourcing">("search");
  const { state } = useLocation();
  const { chatId } = useParams<{ chatId: string }>();
  const [message, setMessage] = useState<string>("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [send, { isLoading }] = useSendMessageMutation();

  const { data } = useGetMessagesByChatIdQuery(chatId as string, {
    skip: !chatId,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const sendMessage = useCallback(
    async (msg: string) => {
      if (msg.length > 3) {
        setMessage("");
        await send({
          chatId: chatId as string,
          content: msg,
        }).unwrap();
        setTimeout(() => {
          if (wrapperRef.current) {
            wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
          }
        }, 500);
      }
    },
    [send, chatId]
  );

  useEffect(() => {
    if (state?.q && state?.q.length > 3) {
      sendMessage(state.q);
    }
  }, [sendMessage, state?.q]);

  return (
    <div className="h-full grid grid-rows-[1fr_auto] relative">
      <div
        className="flex flex-col justify-start overflow-y-auto relative py-4"
        ref={wrapperRef}
      >
        {data?.map((item) =>
          item.sender === "user" ? (
            <div
              key={item._id}
              className="font-mediump-4 pb-2  max-w-3xl w-full mx-auto flex justify-end"
            >
              <p className="bg-stone-900 text-stone-200 p-4 rounded-3xl rounded-br-none">
                {item.content}
              </p>
            </div>
          ) : (
            <div
              key={item._id}
              className="ai-content max-w-3xl mx-auto w-full pl-2 flex flex-col items-start justify-start py-8"
            >
              <div className="bg-stone-200 p-4 rounded-3xl  rounded-bl-none border border-stone-300">
                <AIMessage content={item.content} />
              </div>
            </div>
          )
        )}
      </div>
      <div className="py-4 bg-white max-w-3xl mx-auto w-full">
        <div className="bg-stone-100 rounded-xl border border-stone-300 shadow-md p-4">
          <form
            className="relative"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(message);
            }}
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={"Ask anything..."}
              className="border-0 focus-visible:ring-0 shadow-none focus-visible:ring-offset-0 text-base !bg-transparent"
            />

            <div className="flex items-center justify-end mt-3">
              {/* <div className="flex bg-gray-200 rounded-lg p-1">
                  <Button
                    type="button"
                    size="sm"
                    className={`bg-transparent shadow-none text-gray-400 ${
                      searchMode === "search"
                        ? "!bg-white shadow-md hover:!bg-white"
                        : "hover:!bg-transparent"
                    }`}
                    onClick={() => setSearchMode("search")}
                  >
                    <RiSearchLine className="h-4 w-4" />
                    Search
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className={`bg-transparent shadow-none text-gray-400 ${
                      searchMode === "sourcing"
                        ? "!bg-white shadow-md hover:!bg-white"
                        : "hover:!bg-transparent"
                    }`}
                    onClick={() => setSearchMode("sourcing")}
                  >
                    Sourcing research
                  </Button>
                </div> */}

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  disabled={isLoading}
                  onClick={() => {
                    sendMessage(message);
                  }}
                  className={`rounded-full h-9 w-9 bg-emerald-500 hover:bg-teal-700"`}
                >
                  {!isLoading ? (
                    <RiSendPlaneFill className="h-5 w-5 text-white" />
                  ) : (
                    <Loader className="animate-spin size-5 text-white" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
