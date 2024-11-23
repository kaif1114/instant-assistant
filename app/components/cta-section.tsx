"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto  max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Let AI Assist You, So You Can Focus on What Matters
          </h2>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="btn-gradient text-white">
              Create My AI Assistant Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
            >
              Talk to Our Team for Custom Needs
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
