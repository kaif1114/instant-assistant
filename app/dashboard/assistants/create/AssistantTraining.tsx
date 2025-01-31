"use client";

import { Document, pdfLoaderDocument, SelectedFile } from "@/app/schemas";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatPreview from "./ChatPreview";
import { LoadingAnimation } from "./Loading";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useNewAssistantStore } from "./store";
import { useQueryClient } from "@tanstack/react-query";

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
const MAX_CHARACTERS = 1000000;

export default function AssistantTrainingPage() {
  const { data, setData } = useNewAssistantStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [totalCharacterCount, setTotalCharacterCount] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [scrapedContent, setScrapedContent] = useState<Document[]>([]);
  const { user } = useUser();

  const queryClient = useQueryClient();


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

  const handleSubmit = async () => {
    if (step < 3) {
      nextStep();
      return;
    }
    setIsLoading(true);
    console.log(data);
    console.log(assistantId);
    try {
      await axios.post("/api/assistants/create", {
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
      queryClient.invalidateQueries({ queryKey: ['assistants', user?.id] })

      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNextStep={nextStep} />;
      case 2:
        return <Step2 onNextStep={nextStep} />;
      case 3:
        return (
          <>
            <Step3
              scrapedContent={scrapedContent}
              onSetScrapedContent={setScrapedContent}
              totalCharacterCount={totalCharacterCount}
              onUpdateCharacterCount={setTotalCharacterCount}
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
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="h-[400px]">
          <LoadingAnimation />
        </CardContent>
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
                secondaryColor: "#ffffff",
                avatarUrl: "/placeholder.svg",
              });
              setIsSuccess(false);
            }}
          >
            Create Another Assistant
          </Button>
          <Button
            onClick={() => {
              router.push(`/dashboard/assistants/preview/${assistantId}`);
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
          <div className="space-y-6 h-[700px] flex flex-col">
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
            {step === 3 && (
              <div className="mt-4">
                <Alert
                  variant={
                    totalCharacterCount > MAX_CHARACTERS
                      ? "destructive"
                      : "default"
                  }
                >
                  <AlertTitle>Character Count</AlertTitle>
                  <AlertDescription>
                    Total characters: {totalCharacterCount} / {MAX_CHARACTERS}
                    {totalCharacterCount > MAX_CHARACTERS &&
                      " (Exceeded limit)"}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <div className="flex justify-between items-center">
              <Button type="button" onClick={prevStep} disabled={step === 1}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              {/* {step < 3 ? (
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
              )} */}
            </div>
          </div>
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
            className={`w-2 h-2 rounded-full ${i === step ? "bg-primary" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
