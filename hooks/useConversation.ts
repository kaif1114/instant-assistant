import { langchain_chat_histories, session_details } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Message {
  id: string;
  sessionId: string;
  message: {
    type: "ai" | "human";
    content: string;
  };
}

export function useConversation(sessionId: string | null) {
  return useQuery({
    queryKey: ["conversation", sessionId],
    queryFn: async () => {
      if (!sessionId) return null;
      const response = await axios.get<Message[]>(
        `/api/session/chat?sessionId=${sessionId}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    refetchOnMount: false, // Don't refetch on mount
    refetchOnWindowFocus: false,
  });
}
