import { IOtherSource } from "@/app/schemas";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface AddUrlParams {
    url: string
    assistantId: string
}

export function AddUrlMutation() {
    return useMutation({
        mutationFn: async (AddUrl: AddUrlParams) => {
            const response = await axios.post('/api/crawl', { url: AddUrl.url, mode: "scrape" })
            console.log("response.data: ", response.data.docs)
            return axios.post('/api/savecontext/website', { assistantId: AddUrl.assistantId, documents: response.data.docs });
        }
    })
}