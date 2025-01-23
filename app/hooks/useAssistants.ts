import { Assistants } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useAssistants(userId: string) {
    console.log("[useAssistants] Hook called with userId:", userId);

    return useQuery<Assistants[], AxiosError>({
        queryKey: ['assistants', userId],
        queryFn: async () => {
            console.log("[useAssistants] QueryFn executing for userId:", userId);
            const response = await axios.get<Assistants[]>(`/api/assistants?userId=${userId}`);
            console.log("[useAssistants] Data received:", response.data.length, "assistants");
            return response.data;
        },
        enabled: Boolean(userId),  // Only run query when userId exists
        staleTime: Infinity,    // Never mark data as stale
        gcTime: Infinity,       // Never garbage collect
        refetchOnMount: false,  // Don't refetch on mount
        refetchOnWindowFocus: false,
        retry: false
    })
}