import { IOtherSource } from "@/app/schemas";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface AddFileParams {
    sourceName: string
    file: globalThis.File
    assistantId: string
}

export function AddFileMutation() {
    return useMutation({
        mutationFn: (AddFile: AddFileParams) => {
            const formData = new FormData();
            formData.append("file", AddFile.file!);
            formData.append("fileName", AddFile.sourceName);
            formData.append("assistantId", AddFile.assistantId);
            return axios.post(
                "/api/savecontext/file",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

        }
    })
}