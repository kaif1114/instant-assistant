"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const businessExamples = [
  {
    id: 1,
    name: "Leafy AI",
    image: "/chatui.png?height=600&width=400",
    description:
      "Eco-friendly product recommendations and sustainability insights",
    color: "from-green-100 to-green-50",
    position: { default: 250, md: 180 },
    rotate: 6,
  },
  {
    id: 2,
    name: "Landmark Properties AI",
    image: "/chatui.png?height=600&width=400",
    description: "Intelligent real estate search and virtual property tours",
    color: "from-gray-900 to-gray-800",
    position: { default: 0, md: 0 },
    rotate: 0,
  },
  {
    id: 3,
    name: "Majestic Powder AI",
    image: "/chatui.png?height=600&width=400",
    description:
      "Expert winter sports gear recommendations and sizing assistance",
    color: "from-blue-100 to-blue-50",
    position: { default: -250, md: -180 },
    rotate: -6,
  },
];

export default function ForBusiness() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPositionX = (position: { default: number; md: number }) => {
    return windowWidth >= 1024 ? position.default : position.md;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % businessExamples.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + businessExamples.length) % businessExamples.length
    );
  };

  return (
    <section className="w-full py-4 md:py-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <span className="text-sm font-medium text-purple-600 mb-2 block">
            YOUR ASSISTANT IN ACTION
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Instant Assistant works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Knowledge base assistant, e-commerce customer support agent, real
            estate lead generation, and more - possibilities are limitless.
          </p>
        </div>

        {isMobile ? (
          // Mobile Carousel
          <div className="relative mx-auto h-[600px]">
            <div className="h-[550px] w-[300px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={businessExamples[currentSlide].image}
                    alt={businessExamples[currentSlide].name}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 hover:bg-white"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 hover:bg-white"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative lg:h-[700px] h-[550px] max-w-6xl mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              {businessExamples.map((example, index) => (
                <motion.div
                  key={example.id}
                  className="absolute w-[250px] lg:w-[300px] xl:w-[350px]"
                  style={{
                    originX: 0.5,
                    originY: 0.5,
                  }}
                  initial={{
                    x: getPositionX(example.position),
                    rotate: example.rotate,
                    scale: example.id === 2 ? 1 : 0.92,
                  }}
                  animate={{
                    x: getPositionX(example.position),
                    rotate: hoveredId === example.id ? 0 : example.rotate,
                    scale:
                      hoveredId === example.id || example.id === 2 ? 1 : 0.92,
                    zIndex:
                      hoveredId === example.id
                        ? 11
                        : example.id === 2
                        ? 10
                        : businessExamples.length - index,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  onHoverStart={() => setHoveredId(example.id)}
                  onHoverEnd={() => setHoveredId(null)}
                >
                  <div className="relative">
                    <Image
                      src={example.image}
                      alt={example.name}
                      width={350}
                      height={700}
                      className="w-full h-auto rounded-2xl transition-all duration-300"
                      style={{
                        transform: "translateZ(0)",
                        filter:
                          hoveredId === example.id
                            ? "brightness(1.1) contrast(1.1)"
                            : "none",
                      }}
                      priority
                    />
                    <AnimatePresence>
                      {hoveredId === example.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute  bg-white rounded-lg shadow-lg px-4 py-3  text-center"
                          style={{
                            transform: "translate(-50%, 100%)",
                            backfaceVisibility: "hidden",
                            zIndex: 20,
                          }}
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
        )}
      </div>
    </section>
  );
}
