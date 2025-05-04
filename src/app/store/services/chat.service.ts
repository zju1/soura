import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store.config";
import { envVariables } from "@/config/env";
import type { Chat } from "@/features/HomePage";
import type { IMessage } from "@/features/chat/dto/chat.dto";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envVariables.BASE_URL,
    prepareHeaders: (headers, api) => {
      const { auth } = api.getState() as RootState;

      if (auth.access_token) {
        headers.set("Authorization", `Bearer ${auth.access_token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["CHATS", "MESSAGES"],
  endpoints: (builder) => ({
    getChats: builder.query<Chat[], void>({
      query: () => ({
        url: "chat",
      }),
      providesTags: ["CHATS"],
    }),
    createChat: builder.mutation<{ _id: string }, { title: string }>({
      query: (body) => ({
        url: "chat/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CHATS"],
    }),
    getMessagesByChatId: builder.query<IMessage[], string>({
      query: (chatId) => ({
        url: `chat/message/${chatId}`,
      }),
      providesTags: ["MESSAGES"],
    }),
    sendMessage: builder.mutation<
      IMessage,
      { chatId: string; content: string }
    >({
      query: (body) => ({
        url: `chat/message`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["MESSAGES", "CHATS"],
    }),
    deleteChat: builder.mutation<void, string>({
      query: (chatId) => ({
        url: `chat/dekete/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CHATS"],
    }),
  }),
});

export const {
  useCreateChatMutation,
  useDeleteChatMutation,
  useGetChatsQuery,
  useGetMessagesByChatIdQuery,
  useLazyGetMessagesByChatIdQuery,
  useSendMessageMutation,
} = chatApi;
