/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@ai-sdk/react";
import { ChatComposer } from "./components/ChatComposer";
import { useParams, useSearchParams } from "react-router-dom";
import { UserMessage } from "./components/UserMessage";
import { AIMessage } from "./components/AIMessage";
import { useGetMessagesByChatIdQuery } from "@/app/store/services/chat.service";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Business } from "./dto/chat.dto";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { countries } from "@/constants/countries";
import { envVariables } from "@/config/env";

export function ChatViewPage() {
  const { access_token } = useAuth();
  const { chatId } = useParams<{ chatId: string }>();
  const { data } = useGetMessagesByChatIdQuery(chatId!, {
    refetchOnMountOrArgChange: true,
  });
  const messagesRef = useRef<HTMLDivElement>(null);
  const [businessData, setBusinessData] = useState<Business[]>([]);
  const [params, setParams] = useSearchParams();
  const initial = params.get("initialMessage");
  const { messages, setMessages, append } = useChat({
    api: `${envVariables.BASE_URL}/chat/message`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    experimental_prepareRequestBody: ({ messages }) => {
      return { chatId, content: messages.at(-1)?.content };
    },
    onFinish: (message) => {
      const currentTool = message.parts?.find(
        (item) =>
          item.type === "tool-invocation" &&
          item.toolInvocation.toolName === "supplierTool"
      );

      if (currentTool) {
        setBusinessData((currentTool as any).toolInvocation.result);
      }
      messagesRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    },

    onResponse: () => {
      messagesRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    },
  });

  useEffect(() => {
    if (data) {
      setMessages(
        data.map((item) => ({
          content: item.content,
          id: item._id,
          role: item.sender as any,
          createdAt: item.createdAt as any,
          parts: [
            {
              type: "text",
              text: item.content,
            },
            {
              type: "tool-invocation",
              toolInvocation: {
                toolName: "",
                args: {},
                result: item.data,
                state: "result",
                toolCallId: "",
              },
            },
          ],
        }))
      );
      setTimeout(() => {
        if (initial && initial.length > 0) {
          append({
            content: initial,
            role: "user",
          });
          params.delete("initialMessage");
          setParams(params);
        }
        messagesRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [data, setMessages]);

  const columns: ColumnsType<Business> = useMemo(
    (): ColumnsType<Business> => [
      {
        title: "№",
        dataIndex: "_id",
        width: 60,
        key: "_id",
        render: (_value, _record, index) => index + 1,
        align: "center",
      },
      {
        title: "Organization name",
        dataIndex: "name",
        minWidth: 200,
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (_value, record) => (
          <div>
            <h1 className="font-grotesk text-lg font-semibold">
              {record.name}
            </h1>
            <a className="text-blue-500 font-grotesk font-medium">
              {record.website}
            </a>
          </div>
        ),
      },

      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        width: 100,
        filterSearch: true,
        filters: countries.map((item) => ({
          text: item.label,
          value: item.label,
        })),
        onFilter: (value, record) => record.country === value,
      },

      {
        title: "Tax No",
        dataIndex: "taxNo",
        key: "taxNo",
        width: 100,
      },
      {
        title: "Industry",
        dataIndex: "industry",
        key: "industry",
        width: 150,
      },
      {
        title: "Description",
        dataIndex: "desc",
        key: "desc",
        width: 200,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 200,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 200,
      },
    ],
    []
  );

  return (
    <div
      className={`grid h-full overflow-auto ${
        businessData.length > 0 ? "grid-cols-2" : ""
      }`}
    >
      <div className={`grid overflow-y-auto grid-rows-[1fr_auto]`}>
        <div className="grid gap-8 p-8 max-w-4xl w-full mx-auto content-start">
          {messages.map((item, index) =>
            item.role === "user" ? (
              <UserMessage key={`msg_${index}`} {...item} />
            ) : (
              <AIMessage key={`msg-ai_${index}`} {...item} />
            )
          )}
          <div ref={messagesRef} className="mt-48" />
        </div>
        <div className="p-8 border-t  sticky bottom-0 bg-white">
          <div className="max-w-4xl mx-auto  w-full">
            <ChatComposer
              onSend={(newMessage) =>
                append({
                  content: newMessage,
                  role: "user",
                })
              }
            />
          </div>
        </div>
      </div>
      {businessData.length > 0 && (
        <div className="bg-white overflow-scroll border-l">
          <Table
            dataSource={(businessData || []).map((item, index) => ({
              ...item,
              id: `supplier_${index}`,
            }))}
            columns={columns}
            rowKey="id"
            scroll={{ x: 1300, y: "100%" }}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
}
