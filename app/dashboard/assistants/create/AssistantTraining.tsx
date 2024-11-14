"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatPreview from "./ChatPreview";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useNewAssistantStore } from "./store";

export interface DataFieldEntry {
  pageContent: string;
  metadata: {
    title: string;
    description: string;
  };
}

export type AssistantType =
  | "Support"
  | "Sales"
  | "Technical"
  | "General"
  | "Custom";

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function AssistantTrainingPage() {
  const { data, setData } = useNewAssistantStore();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { user } = useUser();
  const assistantId = uuidv4();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleSubmit = async () => {
    if (step < 3) {
      nextStep();
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("/api/assistants/create", {
        ...data,
        assistantType:
          data.assistantType === "Custom"
            ? data.customType
            : data.assistantType,
        userId: user?.id,
      });
      await axios.post("/api/savecontext", {
        assistantId,
        documents: data.dataFields,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return null;
    }
  };

  const nextStep = () => {
    setDirection(1);
    setStep((prevStep) => Math.min(prevStep + 1, 4));
    console.log(step);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Success!</CardTitle>
          <CardDescription>
            Your assistant has been created successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <Check className="w-16 h-16 text-green-500" />
          </div>
          <p className="text-center mt-4">
            Your AI assistant is now functional and ready to use.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              // Reset form and go back to step 1
              setStep(1);
              setData({
                name: "",
                description: "",
                functionality: "",
                assistantType: "Support",
                customType: "",
                dataFields: [
                  { pageContent: "", metadata: { title: "", description: "" } },
                ],
                startingMessage: "",
                primaryColor: "#000000",
                secondaryColor: "#ffffff",
                avatarUrl: "/placeholder.svg",
              });

              setIsSuccess(false);
            }}
          >
            Create Another Assistant
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="container py-6 px-6">
      <div className="space-y-0.5 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Create Your AI Assistant
        </h2>
        <p className="text-muted-foreground">
          Create and customize your own chatbot assistant
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-around gap-6 min-h-[800px]">
        <div className="w-full lg:w-1/2">
          <form className="space-y-6 h-[700px] flex flex-col">
            <ScrollArea className="flex-grow">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </ScrollArea>
            <div className="flex justify-between items-center">
              <Button type="button" onClick={prevStep} disabled={step === 1}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Assistant"}
                </Button>
              )}
            </div>
          </form>
        </div>
        <div className="w-full lg:w-[30%] lg:sticky lg:top-6 h-[550px]">
          <ChatPreview
            name={data.name}
            description={data.description}
            startingMessage={data.startingMessage}
            avatarUrl={data.avatarUrl}
            primaryColor={data.primaryColor}
            secondaryColor={data.secondaryColor}
          />
        </div>
      </div>
      <div className="flex justify-center space-x-2 ">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === step ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
