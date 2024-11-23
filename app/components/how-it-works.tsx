"use client";

import { motion } from "framer-motion";
import { FileUp, Settings, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: FileUp,
    title: "Create",
    description: "Upload your content and data with our simple interface",
    link: "#",
  },
  {
    icon: Settings,
    title: "Customize",
    description: "Train your AI assistant with your specific requirements",
    link: "#",
  },
  {
    icon: Share2,
    title: "Integrate",
    description: "Deploy your assistant anywhere with our flexible API",
    link: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-24 md:py-32 relative bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              Integrate today
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Create, customize, and deploy your AI assistant in minutes with
              our powerful platform
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative z-10 overflow-hidden rounded-2xl bg-gray-900 p-8 transition-all duration-200 hover:bg-gray-800">
                  <div className="space-y-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 group-hover:bg-gray-700">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-white hover:text-white hover:bg-gray-800 group-hover:btn-gradient"
                      asChild
                    >
                      <a href={feature.link}>
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default HowItWorks;
