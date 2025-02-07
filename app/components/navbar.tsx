"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

function Navbar() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(scrollY > currentScrollY || currentScrollY < 50);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 z-50 w-full transition-all ${
        scrollY > 0
          ? "backdrop-blur-md border-b border-gray-200/20"
          : "backdrop-blur-none border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/InstantAssistant_light.png"
              alt="Instant Assistant Logo"
              width={130}
              height={60}
              priority
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#faqs"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            FAQs
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Testimonials
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignUpButton>
              <Button variant="default" className="btn-gradient text-white">
                Create My Assistant Now
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button
              onClick={() => router.push("/dashboard/assistants")}
              variant="default"
              className="btn-gradient text-white"
            >
              Dashboard
            </Button>
          </SignedIn>
        </div>
      </div>
    </motion.header>
  );
}
export default Navbar;
