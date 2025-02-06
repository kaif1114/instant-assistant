import { Button } from "@/components/ui/button";
import { BarChart, Database, LineChart, PieChart, Zap } from "lucide-react";
import Image from "next/image";

function HeroSection() {
  return (
    <div className="bg-white">
      <div className="relative mt-20">
      <div className="absolute inset-0 bg-dots"></div>
      
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-transparent px-4">
        <div className="relative z-10">
          

          {/* Main content */}
          <div className="flex max-w-[1200px] flex-col items-center space-y-8 lg:mt-44 md:mt-36 mt-24">
            <h1 className="text-center font-bold tracking-tight text-4xl lg:text-5xl">
              Tired Of Answering Same Questions?
              <br />
              Let AI Do It For You.
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
            <div className="relative mt-16 2xl:w-[1400px] xl:w-[1200px] lg:w-[1000px] md:w-[700px] overflow-hidden rounded-xl border bg-background shadow-xl">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet="/dashboard_med.png"
                />
                <Image
                  src="/dashboard.png"
                  alt="Dashboard Preview"
                  width={1920}
                  height={1080}
                  className="w-full"
                  priority
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    </div>
  );
}

export default HeroSection;

