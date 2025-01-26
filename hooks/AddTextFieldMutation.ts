import { IOtherSource, ITextFieldsData } from "@/app/schemas";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Document } from "@/app/schemas";

interface AddTextFieldParams {
    textFieldDocuments: Document[];
    assistantId: string;
    ids: boolean
}

export function AddTextFieldMutation() {
    return useMutation({

        mutationFn: ({ textFieldDocuments, assistantId, ids }: AddTextFieldParams) => {
            return axios.post('/api/savecontext', { assistantId, documents: textFieldDocuments, ids });
        }
    })
}