"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push("/dashboard/assistants/preview");
      }}
      variant="ghost"
      className="mb-4"
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
    </Button>
  );
};

export default BackButton;
