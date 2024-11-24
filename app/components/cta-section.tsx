"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function CTASection() {
  return (
    <section className="w-full py-8 md:py-12 lg:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black via-gray-900 to-black p-12 md:px-8 lg:px-14 lg:py-28"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl lg:text-[2.5rem] font-bold tracking-tight text-white max-w-2xl text-left">
              Let AI Assist You, So You Can Focus on What Matters
            </h2>
            <Button
              size="lg"
              className="bg-white rounded-xl text-black hover:bg-gray-100 min-w-[150px] px-4"
            >
              Start creating for free
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
