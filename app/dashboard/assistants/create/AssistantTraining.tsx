"use client";

import { pricingPlanContext } from "@/app/providers/pricingPlanContext";
import { Document, pdfLoaderDocument, SelectedFile } from "@/app/schemas";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { Assistants } from "@prisma/client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatPreview from "./ChatPreview";
import { LoadingAnimation } from "./Loading";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useNewAssistantStore } from "./store";

export interface DataFieldEntry {
  pageContent: string;
  metadata: {
    title: string;
    description: string;
    id?: number;
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
const assistantId = uuidv4();

export default function AssistantTrainingPage() {
  const { data, setData } = useNewAssistantStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [scrapedContent, setScrapedContent] = useState<Document[]>([]);
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const plan = useContext(pricingPlanContext);

  const handleFileSubmit = async () => {
    setIsLoading(true);

    for (const selectedFile of selectedFiles) {
      const formData = new FormData();
      formData.append("file", selectedFile.file);
      formData.append("fileName", selectedFile.name || "");
      formData.append("assistantId", assistantId);
      console.log(selectedFile.name);

      try {
        const response = await axios.post<pdfLoaderDocument[]>(
          "/api/savecontext/file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
        } else {
          throw new Error(`Failed to upload file: ${selectedFile.file.name}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setIsLoading(false);
    setSelectedFiles([]);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const validateLimits = () => {
    if (!plan) return null;

    const manualInputChars = data.dataFields.reduce(
      (total, field) => total + field.pageContent.length,
      0
    );

    if (manualInputChars > plan.charactersLimit) {
      return `You've exceeded the ${plan.charactersLimit.toLocaleString()} character limit for manual input.`;
    }

    if (scrapedContent.length > plan.urlLimit) {
      return `You've exceeded the ${plan.urlLimit} URL limit for website content.`;
    }

    if (selectedFiles.length > plan.fileLimit) {
      return `You've exceeded the ${plan.fileLimit} file upload limit.`;
    }

    return null;
  };

  const handleSubmit = async () => {
    if (step < 3) {
      nextStep();
      return;
    }

    const limitError = validateLimits();
    if (limitError) {
      setError(limitError);
      return;
    }

    setError(null);
    setIsLoading(true);
    console.log(data);
    console.log(assistantId);
    try {
      const response = await axios.post<Assistants>("/api/assistants/create", {
        assistantId,
        name: data.name,
        description: data.description,
        assistantType:
          data.assistantType === "Custom"
            ? data.customType
            : data.assistantType,
        userId: user?.id,
        functionality: data.functionality,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        startingMessage: data.secondaryColor,
        avatarUrl: data.avatarUrl,
      });
      if (
        data.dataFields.length > 0 &&
        data.dataFields[0].pageContent.length > 2
      ) {
        await axios.post("/api/savecontext", {
          assistantId,
          documents: data.dataFields,
          ids: true,
        });
      }

      console.log("scrapedContent: ", scrapedContent);
      await axios.post("/api/savecontext/website", {
        assistantId,
        documents: scrapedContent,
      });

      await handleFileSubmit();
      console.log(response.data);

      queryClient.invalidateQueries({ queryKey: ["assistants", user?.id] });

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setError("Failed to create assistant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            onNextStep={nextStep}
            onPreviousStep={prevStep}
            isPrevButtonDisabled={step == 1}
          />
        );
      case 2:
        return <Step2 onNextStep={nextStep} onPreviousStep={prevStep} />;
      case 3:
        return (
          <>
            <Step3
              onPrevStep={prevStep}
              scrapedContent={scrapedContent}
              onSetScrapedContent={setScrapedContent}
              assistantId={assistantId}
              selectedFiles={selectedFiles}
              onSetSelectedFiles={setSelectedFiles}
              isButtonDisabled={isLoading}
              onSubmit={handleSubmit}
            />
          </>
        );
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

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto mt-8">
        <div className="h-[400px]">
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => setError(null)}>Try Again</Button>
        </CardFooter>
      </Card>
    );
  }

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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Check className="w-16 h-16 text-green-500" />
            </motion.div>
          </div>
          <motion.p
            className="text-center mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your AI assistant is now functional and ready to use.
          </motion.p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
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
                secondaryColor: "#f2f2f2",
                avatarUrl: "/placeholder.svg",
              });
              setIsSuccess(false);
            }}
          >
            Create Another Assistant
          </Button>
          <Button
            onClick={() => {
              router.push(`/dashboard/assistants/preview`);
            }}
            variant="outline"
          >
            Preview Assistant
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/assistants">
                  Assistants
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Centered heading section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Create Your AI Assistant
          </h2>
          <p className="text-muted-foreground">
            Create and customize your own AI assistant
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 min-h-[700px]">
          {/* Main content area */}
          <div className="w-full lg:w-3/5">
            <div className="space-y-6 h-[700px] flex flex-col">
              <ScrollArea className="flex-grow pr-4">
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
            </div>
          </div>

          {/* Preview area */}
          <div className="w-full lg:w-2/5">
            <div className="lg:sticky lg:top-8">
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
        </div>

        {/* Step indicators */}
        <div className="flex justify-center space-x-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                i === step ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
