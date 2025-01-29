"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AppearanceTab } from "./appearance-tab";
import { CustomTabs } from "./custom-tabs";
import { InstallTab } from "./install-tab";
import { KnowledgeBaseTab } from "./KnowledgeBase/KnowledgeBaseTab";
import { PreviewTab } from "./preview-tab";
import { useSelectedAssistantStore } from "../store";
import { useRouter } from "next/navigation";

const tabs = [
  { id: "appearance", label: "Appearance" },
  { id: "knowledge-base", label: "Knowledge Base" },
  { id: "install", label: "Installation" },
  { id: "preview", label: "Preview" },
];

const tabVariants = {
  enter: {
    opacity: 0,
    x: 20,
  },
  center: {
    zIndex: 1,
    opacity: 1,
    x: 0,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    x: -20,
  },
};

const AssistantPage = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const { selectedAssistant } = useSelectedAssistantStore();
  const router = useRouter();


  useEffect(() => {
    if (!selectedAssistant) {
      router.push('/dashboard/assistants/preview')
    }
  }, [selectedAssistant, router])
  if (!selectedAssistant) {
    return <><div>
      <p>Error occured</p>
    </div></>
  }
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-black">
          Assistant Settings
        </h2>
      </div>

      <div className="space-y-6">
        <CustomTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.2 },
              x: { duration: 0.4 },
            }}
          >
            {activeTab === "appearance" && <AppearanceTab />}
            {activeTab === "install" && <InstallTab />}
            {activeTab === "preview" && <PreviewTab />}
            {activeTab === "knowledge-base" && <KnowledgeBaseTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssistantPage;
