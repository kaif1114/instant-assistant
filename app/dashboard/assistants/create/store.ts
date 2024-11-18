import { NewAssistantData } from "@/app/schemas";
import { create } from "zustand";

interface DataStore {
  data: NewAssistantData;
  setData: (newData: Partial<NewAssistantData>) => void;
}

export const useNewAssistantStore = create<DataStore>((set) => ({
  data: {
    name: "",
    description: "",
    functionality: "",
    assistantType: "Support",
    customType: "",
    dataFields: [{ pageContent: "", metadata: { title: "", description: "" } }],
    startingMessage: "",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    avatarUrl: "/placeholder.svg",
  },
  setData: (newData) => set((prev) => ({ data: { ...prev.data, ...newData } })),
}));
