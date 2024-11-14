import { NewAssistantData } from "@/app/schemas";
import { create } from "zustand";

interface DataStore {
  data: NewAssistantData;
  setData: (newData: NewAssistantData) => void;
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
  setData: (newData: NewAssistantData) => set(() => ({ data: newData })),
}));
