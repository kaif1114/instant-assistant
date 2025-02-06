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
              Instant Assistant is the AI-native application that builds, scales and grows your company to the next level.
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
  
    </div>
  );
}
export default HeroSection;

