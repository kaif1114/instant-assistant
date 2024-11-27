"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const businessExamples = [
  {
    id: 1,
    name: "Leafy AI",
    image: "/chatui.png?height=600&width=400",
    description:
      "Eco-friendly product recommendations and sustainability insights",
    color: "from-green-100 to-green-50",
    position: 300,
    rotate: 6,
  },
  {
    id: 2,
    name: "Landmark Properties AI",
    image: "/chatui.png?height=600&width=400",
    description: "Intelligent real estate search and virtual property tours",
    color: "from-gray-900 to-gray-800",
    position: 0,
    rotate: 0,
  },
  {
    id: 3,
    name: "Majestic Powder AI",
    image: "/chatui.png?height=600&width=400",
    description:
      "Expert winter sports gear recommendations and sizing assistance",
    color: "from-blue-100 to-blue-50",
    position: -300,
    rotate: -6,
  },
];

export default function ForBusiness() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <span className="text-sm font-medium text-purple-600 mb-2 block">
            Website chat widget
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI chatbot for your business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Knowledge base assistant, e-commerce customer support agent, real
            estate lead generation, and more - possibilities are limitless. Your
            custom GPT can do it all.
          </p>
        </div>

        <div className="relative h-[600px] max-w-5xl mx-auto">
          {businessExamples.map((example, index) => (
            <motion.div
              key={example.id}
              className="absolute left-1/2 w-[300px] md:w-[400px] cursor-pointer"
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              initial={{
                x: `calc(-50% + ${example.position}px)`,
                rotate: example.rotate,
                scale: example.id === 2 ? 1 : 0.95,
                zIndex: example.id === 2 ? 10 : businessExamples.length - index,
              }}
              animate={{
                x: `calc(-50% + ${example.position}px)`,
                rotate: hoveredId === example.id ? 0 : example.rotate,
                scale: hoveredId === example.id || example.id === 2 ? 1 : 0.95,
                zIndex:
                  hoveredId === example.id
                    ? 11
                    : example.id === 2
                    ? 10
                    : businessExamples.length - index,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 1,
              }}
              onHoverStart={() => setHoveredId(example.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="relative overflow-visible">
                <Image
                  src={example.image}
                  alt={example.name}
                  width={400}
                  height={600}
                  className="w-full h-auto transition-all duration-300 ease-in-out"
                  style={{
                    background: "transparent",
                    filter:
                      hoveredId === example.id
                        ? "brightness(1.1) contrast(1.1)"
                        : "none",
                  }}
                />
                <AnimatePresence>
                  {hoveredId === example.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -bottom-20  -translate-x-1/2 bg-white rounded-lg shadow-lg px-4 py-3 min-w-[200px] w-full text-center"
                    >
                      <h3 className="text-base font-medium mb-1">
                        {example.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {example.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
