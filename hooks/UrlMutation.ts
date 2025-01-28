import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Params {
    urls?: string[]
    assistantId: string
    urlsToRemove?: string[]
}

export function UrlMutation() {
    return useMutation({
        mutationFn: async ({ assistantId, urls, urlsToRemove }: Params) => {
            let deleteResponse, addResponse
            if (urlsToRemove?.length! > 0) {
                deleteResponse = await axios.post(`/api/deletecontext`, {

                    assistantId,
                    sourceType: "urls",
                    source: urlsToRemove

                });
            }
            if (urls?.length! > 0) {
                const urlPromises = urls?.map(async (url) => {
                    const response = await axios.post('/api/crawl', { url, mode: "scrape" });
                    return axios.post('/api/savecontext/website', {
                        assistantId,
                        documents: response.data.docs
                    });
                });
                addResponse = await Promise.all(urlPromises || []);
            }
            return { deleteResponse, addResponse }
        }
    })
}