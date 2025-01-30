'use client'
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from "react";
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

// Create a storage persister
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
})

// Create persister
const persister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    key: 'ASSISTANTS_CACHE', // unique key for your cache
    throttleTime: 1000, // write updates at most once per second
    serialize: (data) => JSON.stringify(data),
    deserialize: (data) => JSON.parse(data),
})

// Configure persistence
persistQueryClient({
    queryClient,
    persister,
    // Maximum age of cache before invalidation
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    // Persist only specific queries
    dehydrateOptions: {
        shouldDehydrateQuery: (query: { queryKey: readonly unknown[] }) => {
            return query.queryKey[0] === 'assistants'
        },
    },
})

export default function QueryProvider({ children }: PropsWithChildren) {
    return (
        <PersistQueryClientProvider persistOptions={{ persister }} client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
    );
} 