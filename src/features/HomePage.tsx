import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateChatMutation } from "@/app/store/services/chat.service";
import { Composer } from "@/components/composer";

export interface Chat {
  userId: string;
  createdAt: Date;
  title: string;
  _id: string;
}

export function HomePage() {
  const [createChat, { isLoading: chatLoading }] = useCreateChatMutation();
  const navigate = useNavigate();

  const suggestedQueries = [
    "Find suppliers for cotton t-shirts in Bangladesh",
    "Electronics manufacturers in Shenzhen with low MOQ",
    "Sustainable furniture suppliers in Vietnam",
    "Packaging suppliers with recycled materials",
    "Textile manufacturers with GOTS certification",
  ];

  const handleSearch = useCallback(
    async (q: string) => {
      if (q.length > 3) {
        const { _id } = await createChat({
          title: q,
        }).unwrap();
        navigate(`/c/${_id}?initialMessage=${q}`);
      }
    },
    [createChat, navigate]
  );

  return (
    <div className="h-[80%] flex items-center">
      <div className="w-full max-w-3xl mx-auto my-4 px-4 relative grid gap-4">
        <h1 className="text-center text-2xl font-medium text-stone-700 font-grotesk">
          What do we search today?
        </h1>
        <Composer
          isLoading={chatLoading}
          onSend={handleSearch}
          suggestedQueries={suggestedQueries}
        />
      </div>
    </div>
  );
}
