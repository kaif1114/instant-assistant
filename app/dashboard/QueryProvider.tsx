'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from "react";

console.log("[QueryProvider] Creating new QueryClient instance");

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity, // Never mark data as stale
            gcTime: Infinity,    // Never garbage collect
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: false,
        },
    },
});

// Add this to track query cache operations
queryClient.getQueryCache().subscribe({
    onSuccess: (query) => {
        console.log("[QueryCache] Query succeeded:", query?.queryKey);
    },
    onError: (error, query) => {
        console.log("[QueryCache] Query error:", query?.queryKey, error);
    },
});

export default function QueryProvider({ children }: PropsWithChildren) {
    console.log("[QueryProvider] Rendering");
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
} 