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
    dataFields: [
      { pageContent: "", metadata: { title: "", description: "", id: 0 } },
    ],
    startingMessage: "",
    primaryColor: "#478ACD",
    secondaryColor: "#f2f2f2",
    charactersUsed: 0,
    avatarUrl:
      "https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar3.jpg",
  },
  setData: (newData) => set((prev) => ({ data: { ...prev.data, ...newData } })),
}));
