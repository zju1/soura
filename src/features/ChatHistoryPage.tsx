import { useGetChatsQuery } from "@/app/store/services/chat.service";
import { RiArrowRightSLine } from "@remixicon/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export function ChatHistoryPage() {
  const { data } = useGetChatsQuery();
  const navigate = useNavigate();
  return (
    <div className="container max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-semibold font">Chat History</h1>
        <div className="flex flex-col gap-2">
          {data?.map((chat) => (
            <div
              key={chat._id}
              className="flex items-center justify-between p-2 border border-stone-200 rounded-md  bg-stone-100 cursor-pointer hover:shadow-md transition-all duration-200 ease-linear"
              onClick={() => navigate(`/c/${chat._id}`)}
            >
              <div>
                <h2 className="text-sm">{chat.title}</h2>
                <p className="text-stone-400 text-xs">
                  {moment(chat.createdAt).format("D-MMM, YYYY, HH:mm")}
                </p>
              </div>
              <RiArrowRightSLine className="text-stone-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
