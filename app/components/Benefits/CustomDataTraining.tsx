"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight, Database } from "lucide-react";

export function CustomDataTraining() {
  const steps = [
    { icon: FileText, label: "Upload custom data" },
    { icon: ArrowRight, label: "Process" },
    { icon: Database, label: "Train AI model" },
  ];

  return (
    <div className="flex justify-center items-center space-x-4">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <motion.div
            className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <step.icon className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-sm text-gray-300 text-center">{step.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
