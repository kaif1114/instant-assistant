import { IOtherSource } from "@/app/schemas";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Params {

    files?: IOtherSource[]
    assistantId: string
    filesToRemove?: string[]
}

export function FileMutation() {
    return useMutation({
        mutationFn: async ({ assistantId, files, filesToRemove }: Params) => {
            let deleteResponse, addResponse
            if (filesToRemove?.length! > 0) {

                deleteResponse = await axios.post(`/api/deletecontext`, { assistantId, sourceType: "files", filesToRemove })
            }
            if (files?.length! > 0) {
                const filePromises = files?.map(({ file, source }, index) => {
                    const formData = new FormData();
                    formData.append("file", file!);
                    formData.append("fileName", source);
                    formData.append("assistantId", assistantId);
                    return axios.post(
                        "/api/savecontext/file",
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                })
                addResponse = await Promise.all(filePromises || [])
            }
            return { deleteResponse, addResponse }

        }
    })
}