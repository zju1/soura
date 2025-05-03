import { useGetMessagesByChatIdQuery } from "@/app/store/services/chat.service";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { ChatComposer } from "./components/ChatComposer";

export function ChatViewPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const { data, isFetching } = useGetMessagesByChatIdQuery(chatId!, {
    refetchOnMountOrArgChange: true,
    skip: !chatId,
  });

  return (
    <div className={`h-full grid relative`}>
      {isFetching && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white/70">
          <Loader className="animate-spin" />
        </div>
      )}
      <div className="grid h-full grid-rows-[1fr_auto] max-w-3xl mx-auto w-full">
        <div className="py-4"></div>
        <div className="py-4">
          <ChatComposer />
        </div>
      </div>
    </div>
  );
}
