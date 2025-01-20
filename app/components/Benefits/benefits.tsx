"use client";

import { motion } from "framer-motion";
import { MessageSquare, Database } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { ScriptTagAnimation } from "./ScriptTagAnimation";
import { CustomDataTraining } from "./CustomDataTraining";

const features = [
  {
    icon: MessageSquare,
    label: "ChatGPT Analytics",
    title: "Gain valuable insights",
    description:
      "You can see all conversations between your customers & your chatbot. Powerful analytics, notifications and charts help you learn what your customers ask for to improve your product and support.",
    stats: [
      {
        label: "Conversations this month",
        value: 602,
        change: "+30% from last month",
      },
      { label: "Total conversations", value: 2735 },
      { label: "Actions used", value: 102, change: "+128.3% from last month" },
    ],
  },
  {
    icon: MessageSquare,
    label: "Custom ChatGPT Integrations",
    title: "Easy to use & share",
    description:
      "Install the custom AI chatbot on your website or integrate with your favorite tools. Website chatbot comes in two flavors: a popup that is located in the corner of the screen or a chat widget that you can embed anywhere on your page.",
    scriptTag: true,
  },
  {
    icon: Database,
    label: "Custom Data Training",
    title: "Train on your own data",
    description:
      "Easily train your AI assistant on your custom data. Upload your documents, process them, and create a uniquely tailored AI model that understands your specific domain and terminology.",
    customTraining: true,
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

function Benefits() {
  return (
    <section
      id="how-it-works"
      className="w-full py-24 md:py-32 relative bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-24 w-full max-w-6xl mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.label}
              variants={itemVariants}
              className="space-y-8"
            >
              <div className="space-y-2">
                <p className="text-purple-400 font-medium">{feature.label}</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  {feature.title}
                  <span className="text-purple-400">.</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl">
                  {feature.description}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
                {feature.stats && (
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {feature.stats.map((stat, i) => (
                      <div key={i} className="space-y-2">
                        <div className="text-2xl sm:text-3xl font-bold text-white">
                          <AnimatedCounter from={0} to={stat.value} />
                        </div>
                        <p className="text-gray-400">{stat.label}</p>
                        {stat.change && (
                          <p className="text-sm text-green-400">
                            {stat.change}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {feature.scriptTag && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">
                      Easy Integration
                    </h3>
                    <ScriptTagAnimation />
                  </div>
                )}
                {feature.customTraining && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">
                      Custom Data Training Process
                    </h3>
                    <CustomDataTraining />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Benefits;
