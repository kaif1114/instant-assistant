import { Document } from "@/app/schemas";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Params {
    textFieldDocuments?: Document[];
    assistantId: string;
    ids?: boolean
    textFieldsToRemove?: string[]
}

export function TextFieldMutation() {
    return useMutation({

        mutationFn: async ({ textFieldsToRemove, textFieldDocuments, assistantId, ids }: Params) => {
            let deleteResponse, addResponse
            if (textFieldsToRemove?.length! > 0) {
                deleteResponse = await axios.post(`/api/deletecontext`, { sourceType: "textfields", source: textFieldsToRemove, assistantId })
            }

            if (textFieldDocuments?.length! > 0) {
                addResponse = await axios.post('/api/savecontext', { assistantId, documents: textFieldDocuments, ids });
            }
            return { deleteResponse, addResponse }
        }
    })
}