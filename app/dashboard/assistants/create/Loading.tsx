import { motion } from "framer-motion";

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-lg font-medium text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Creating your AI assistant...
      </motion.p>
    </div>
  );
}
