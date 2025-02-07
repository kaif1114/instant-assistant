import { session_details } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useSessions(assistantId: string | null) {
  return useQuery<session_details[], AxiosError>({
    queryKey: ["sessions", assistantId],
    queryFn: async () => {
      if (!assistantId) return [];
      const response = await axios.get<session_details[]>(
        `/api/session?assistantId=${assistantId}`
      );
      return response.data;
    },
    staleTime: Infinity, // Never mark data as stale
    refetchOnMount: false, // Don't refetch on mount
    refetchOnWindowFocus: false,
  });
}
