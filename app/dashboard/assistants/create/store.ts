import { NewAssistantData } from "@/app/schemas";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DataStore {
  data: NewAssistantData;
  setData: (newData: Partial<NewAssistantData>) => void;
}

export const useNewAssistantStore = create(
  persist<DataStore>(
    (set) => ({
      data: {
        assistantId: "",
        name: "",
        description: "",
        functionality: "",
        Type: "Support",
        customType: "",
        dataFields: [
          { pageContent: "", metadata: { title: "", description: "", id: 0 } },
        ],
        startingMessage: "",
        primaryColor: "#000000",
        secondaryColor: "#f2f2f2",
        charactersUsed: 0,
        fileLimitUsed: 0,
        urlLimitUsed: 0,
        avatarUrl:
          "https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar3.jpg",
      },
      setData: (newData) =>
        set((prev) => ({ data: { ...prev.data, ...newData } })),
    }),
    {
      name: "assistant-storage",
    }
  )
);
