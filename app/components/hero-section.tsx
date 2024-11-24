"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductHuntBadge from "./product-hunt-badge";
import CurvedArrow from "./curved-arrow";
import { Play } from "lucide-react";
import { ChatPreview } from "./chat-preview";

function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-[#E97451]/10 via-white to-[#8B7FD3]/10">
      <section className="relative w-full pt-32 pb-20 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductHuntBadge />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-6xl space-y-4"
            >
              <h1 className="text-4xl  lg:text-5xl font-bold tracking-tight">
                Tired of Answering the{" "}
                <span className="text-[#E97451]">Same Questions</span> ?{" "}
                <p>
                  Let <span className="text-[#8B7FD3]">AI</span> Do It for You!
                </p>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Instantly create an AI-powered assistant that answers questions,
                provides support, and works 24/7—all without coding or manual
                training.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <Button
                size="lg"
                className="rounded-full bg-black hover:bg-gray-900 text-white font-satoshi min-w-[200px]"
              >
                Start creating for free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-satoshi"
              >
                See how it works
                <Play className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          {/* <CurvedArrow /> */}
        </div>
      </section>

      <section className="w-full py-20">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">
                  Transform your content workflow
                </h2>
                <p className="text-gray-500 text-lg">
                  Stop spending hours editing videos and writing documentation.
                  Our AI-powered platform handles it all.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-[#E97451]/10 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-[#E97451]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Lightning Fast</h3>
                    <p className="text-gray-500">
                      Generate content in minutes, not hours
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-[#8B7FD3]/10 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-[#8B7FD3]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">AI-Powered</h3>
                    <p className="text-gray-500">
                      Smart content generation and enhancement
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Customizable</h3>
                    <p className="text-gray-500">
                      Tailor content to match your brand
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pl-8 relative h-[600px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-full"
              >
                <ChatPreview />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
