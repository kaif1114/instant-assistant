import { Assistants } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useAssistants(userId: string | undefined) {
    return useQuery<Assistants[], AxiosError>({
        queryKey: ['assistants', userId],
        queryFn: async () => {
            if (!userId) return [];
            const response = await axios.get<Assistants[]>(`/api/assistants?userId=${userId}`);
            return response.data;
        },
        enabled: Boolean(userId),  // Only run query when userId exists
        staleTime: Infinity,    // Never mark data as stale
        refetchOnMount: false,  // Don't refetch on mount
        refetchOnWindowFocus: false,
        retry: false
    })
}