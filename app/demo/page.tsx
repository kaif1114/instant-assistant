"use client";
import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const page = () => {
  return (
    <div className="container mx-auto px-4 mt-16">
      <div className="w-full max-w-[1100px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        <div className="relative w-full overflow-hidden rounded-xl border bg-background shadow-xl aspect-video">
          <iframe
            src="https://www.youtube.com/embed/OOWe_kTq1X0"
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default page;
