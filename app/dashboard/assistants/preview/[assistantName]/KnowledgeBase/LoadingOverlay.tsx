"use client"

import { Spinner } from "@/components/ui/BoxLoadingSpinner"
import { motion, AnimatePresence } from "framer-motion"

import { Check, X, Loader2 } from "lucide-react"

interface PropertyStatusProps {
    label: string
    state: PropertyState
}

interface PropertyState {
    isProcessing: boolean
    isSuccess: boolean
    isError: boolean
    errorMessage?: string
}

interface LoadingOverlayProps {
    isVisible: boolean
    manualInputs: PropertyState
    websites: PropertyState
    files: PropertyState
}



export function LoadingOverlay({ isVisible, manualInputs, websites, files }: LoadingOverlayProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-black/30 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.div
                        className="z-10 text-white text-center max-w-md w-full px-4 flex flex-col items-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-center mb-4"
                        >
                            <Spinner />
                            <motion.h2
                                className="text-3xl sm:text-4xl font-bold ml-4 tracking-tight"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Assistant Retraining
                            </motion.h2>
                        </motion.div>
                        <motion.div
                            className="space-y-6 mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <PropertyStatus label="Manual Inputs" state={manualInputs} />
                            <PropertyStatus label="Websites" state={websites} />
                            <PropertyStatus label="Files" state={files} />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function PropertyStatus({ label, state }: PropertyStatusProps) {
    return (
        <motion.div
            className="flex items-center space-x-4 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
        >
            <motion.div
                className="w-6 h-6 relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
            >
                {state.isProcessing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 className="w-6 h-6 animate-spin text-blue-300 absolute" />
                    </motion.div>
                )}
                {state.isSuccess && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    >
                        <Check className="w-6 h-6 text-green-300 absolute" />
                    </motion.div>
                )}
                {state.isError && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    >
                        <X className="w-6 h-6 text-red-300 absolute" />
                    </motion.div>
                )}
            </motion.div>
            <motion.span
                className={`font-medium text-base sm:text-lg ${state.isProcessing
                    ? "text-blue-200"
                    : state.isSuccess
                        ? "text-green-200"
                        : state.isError
                            ? "text-red-200"
                            : "text-white"
                    }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.3 }}
            >
                {label}
            </motion.span>
            {state.isError && (
                <motion.span
                    className="text-red-200 text-xs sm:text-sm ml-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.4 }}
                >
                    {state.errorMessage}
                </motion.span>
            )}
        </motion.div>
    )
}
