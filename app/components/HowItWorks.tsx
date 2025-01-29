import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Mic, Pencil, Download } from "lucide-react";
import Image from "next/image";

function HowItWorks() {
  const benefits = [
    {
      title: "Record",
      description:
        "Record with our chrome extension. Get AI generated document and video in seconds.",
      icon: Mic,
      image: "/placeholder.webp?height=400&width=600",
    },
    {
      title: "Edit",
      description:
        "Modify the script if required. Select your desired AI voiceover, wallpaper, music.",
      icon: Pencil,
      image: "/placeholder.webp?height=400&width=600",
    },
    {
      title: "Download",
      description:
        "Hit generate and download the document & video in the format of your choice.",
      icon: Download,
      image: "/placeholder.webp?height=400&width=600",
    },
  ];

  return (
    <section className="w-full py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
        <div className="flex flex-col items-start">
          <div className="mb-16">
            <Badge className="mb-6 px-4 py-1.5 text-sm font-medium bg-amber-50 text-amber-900 hover:bg-amber-50 border-0">
              YOUR ASSISTANT IN 3 STEPS.
            </Badge>
            <h2 className="text-[48px] font-bold tracking-tight text-gray-900">
              How Instant Assistant works
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col">
                <Card className="border rounded-xl overflow-hidden bg-white shadow-sm mb-6">
                  <div className="aspect-video relative bg-gray-100 w-full overflow-hidden">
                    <Image
                      src={benefit.image}
                      alt={`${benefit.title} illustration`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Card>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
