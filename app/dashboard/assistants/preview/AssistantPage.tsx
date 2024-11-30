"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomTabs } from "./custom-tabs";
import { AppearanceTab } from "./appearance-tab";
import { InstallTab } from "./install-tab";
import { PreviewTab } from "./preview-tab";
import { Assistants } from "@prisma/client";

const tabs = [
  { id: "appearance", label: "Appearance" },
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

const AssistantPage = ({ Assistant }: { Assistant: Assistants }) => {
  const [activeTab, setActiveTab] = useState("appearance");

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
            {activeTab === "appearance" && (
              <AppearanceTab Assistant={Assistant} />
            )}
            {activeTab === "install" && (
              <InstallTab assistantId={Assistant.assistantId} />
            )}
            {activeTab === "preview" && <PreviewTab Assistant={Assistant} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssistantPage;
