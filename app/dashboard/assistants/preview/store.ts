import { Assistants } from "@prisma/client";
import { create } from "zustand";

interface selectedAssistantStore {
  selectedAssistant: Assistants | null;
  setSelectedAssistant: (assistant: Assistants) => void;
}

export const useSelectedAssistantStore = create<selectedAssistantStore>(
  (set) => ({
    selectedAssistant: null,
    setSelectedAssistant: (assistant) => set({ selectedAssistant: assistant }),
  })
);
