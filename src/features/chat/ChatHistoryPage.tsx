import { useGetChatsQuery } from "@/app/store/services/chat.service";
import { RiMessage3Line } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import type { Chat } from "../HomePage";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "antd";

function groupByDate(data: Chat[]) {
  return data.reduce((acc, item) => {
    const dateKey = new Date(item.createdAt).toISOString().split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {} as Record<string, typeof data>);
}

export function ChatHistoryPage() {
  const { data } = useGetChatsQuery();
  const navigate = useNavigate();
  const historyItems = groupByDate(data || []);
  let globalIndex = 0;

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card className="">
        <div className="flex flex-col gap-8 p-4">
          <h1 className="text-4xl font-black font-grotesk">Chat History</h1>
          <div className="flex flex-col gap-8">
            {Object.keys(historyItems).map((key) => (
              <div key={key} className="grid gap-4">
                <h3 className="text-lg">{key}</h3>
                <div className="grid gap-4">
                  {historyItems[key].map((item) => {
                    const delay = globalIndex * 0.1;
                    globalIndex++;
                    return (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay,
                        }}
                      >
                        <div
                          className="flex items-start gap-4 group"
                          onClick={() => navigate(`/c/${item._id}`)}
                        >
                          <div className="size-8 flex items-center justify-center rounded-xl bg-gray-200 text-gray-700 select-none">
                            <RiMessage3Line className="size-4" />
                          </div>
                          <div className="flex-1 flex items-center justify-between pb-4 cursor-pointer">
                            <div className="grid gap-1">
                              <p className="select-none text-md font-grotesk">
                                {item.title}
                              </p>
                            </div>
                            <ChevronRight className="size-4 shrink-0" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
