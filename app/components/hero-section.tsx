"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart, Database, LineChart, PieChart, Zap } from "lucide-react";
import Image from "next/image";
import { ChatPreview } from "./chat-preview";
import ForBusiness from "./ForBusiness";

function HeroSection() {
  return (
    <div className="bg-white">
      <div className="relative mt-20">
      <div className="absolute inset-0 bg-dots"></div>
      
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-transparent px-4">
        <div className="relative z-10">
          

          {/* Main content */}
          <div className="flex max-w-[1200px] flex-col items-center space-y-8 mt-44">
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Customer
              <br />
              relationship magic.
            </h1>

            <p className="max-w-[600px] text-center text-lg text-muted-foreground">
              Attio is the AI-native CRM that builds, scales and grows your company to the next level.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="min-w-[140px]">
                Start for free
              </Button>
              <Button size="lg" variant="outline" className="min-w-[140px]">
                Talk to sales
              </Button>
            </div>

            {/* Features row */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <span>Data</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span>Automations</span>
              </div>
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                <span>Pipeline</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                <span>Productivity</span>
              </div>
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                <span>Reporting</span>
              </div>
            </div>

            {/* Dashboard Image */}
            <div className="relative mt-16 w-full overflow-hidden rounded-xl border bg-background shadow-xl">
              <Image src="/dashboard.png" alt="Dashboard Preview" width={1920} height={1080} className="w-full" priority />
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <ForBusiness />
    </div>
  );
}
export default HeroSection;

