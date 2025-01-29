import { Assistants } from "@prisma/client";
import { create } from "zustand";

interface selectedAssistantStore {
  selectedAssistant: Assistants | null;
  setSelectedAssistant: (
    assistantOrUpdater: Assistants | ((prev: Assistants) => Assistants)
  ) => void;
}

export const useSelectedAssistantStore = create<selectedAssistantStore>(
  (set) => ({
    selectedAssistant: null,
    setSelectedAssistant: (assistantOrUpdater) =>
      set((state) => {
        if (!state.selectedAssistant) {
          if (typeof assistantOrUpdater === "function") {
            throw new Error("Cannot update null assistant");
          }
          return { selectedAssistant: assistantOrUpdater };
        }
        return {
          selectedAssistant:
            typeof assistantOrUpdater === "function"
              ? assistantOrUpdater(state.selectedAssistant)
              : assistantOrUpdater,
        };
      }),
  })
);
