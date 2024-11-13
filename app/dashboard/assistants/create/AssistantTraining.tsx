"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  PlusCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CldUploadButton,
  CldUploadWidget,
  getCldImageUrl,
} from "next-cloudinary";

interface DataFieldEntry {
  pageContent: string;
  metadata: {
    title: string;
    description: string;
  };
}

type AssistantType = "Support" | "Sales" | "Technical" | "General" | "Custom";

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

function ChatPreview({
  name,
  description,
  startingMessage,
  avatarUrl,
  primaryColor,
  secondaryColor,
}: {
  name: string;
  description: string;
  startingMessage: string;
  avatarUrl: string;
  primaryColor: string | undefined;
  secondaryColor: string | undefined;
}) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "assistant",
      text: startingMessage || "Hey! How can I help you today?",
    },
  ]);

  useEffect(() => {
    setChatHistory([
      {
        sender: "assistant",
        text: startingMessage || "Hey! How can I help you today?",
      },
    ]);
  }, [startingMessage]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: "user", text: message }]);
      setMessage("");
    }
  };

  return (
    <Card className="w-full h-full rounded-xl overflow-hidden shadow-lg flex flex-col">
      <CardHeader className="p-4" style={{ backgroundColor: primaryColor }}>
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt="Assistant Avatar" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-white">
              {name || "AI Assistant"}
            </h2>
            <p className="text-sm text-white opacity-80">
              {description || "Your personal AI assistant"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="space-y-4 p-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                  style={{
                    backgroundColor:
                      msg.sender === "user" ? primaryColor : secondaryColor,
                    color: msg.sender === "user" ? "white" : "black",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto">
        <form
          onSubmit={sendMessage}
          className="flex items-center space-x-2 w-full"
        >
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default function AssistantTrainingPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [functionality, setFunctionality] = useState("");
  const [assistantType, setAssistantType] = useState<AssistantType>("Support");
  const [customType, setCustomType] = useState("");
  const [dataFields, setDataFields] = useState<DataFieldEntry[]>([
    { pageContent: "", metadata: { title: "", description: "" } },
  ]);
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [startingMessage, setStartingMessage] = useState(
    "Hey! How can I help you today?"
  );
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { user } = useUser();
  const assistantId = uuidv4();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const addDataField = () => {
    setDataFields([
      ...dataFields,
      { pageContent: "", metadata: { title: "", description: "" } },
    ]);
  };

  const removeDataField = (index: number) => {
    const newDataFields = dataFields.filter((_, i) => i !== index);
    setDataFields(newDataFields);
  };

  const updateDataField = (
    index: number,
    field: "pageContent" | "title" | "description",
    value: string
  ) => {
    const newDataFields = [...dataFields];
    if (field === "pageContent") {
      newDataFields[index].pageContent = value;
    } else {
      newDataFields[index].metadata[field] = value;
    }
    setDataFields(newDataFields);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step <= 3) {
      nextStep();
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("/api/assistants/create", {
        assistantId,
        name,
        description,
        assistantType: assistantType === "Custom" ? customType : assistantType,
        userId: user?.id,
        functionality,
        primaryColor,
        secondaryColor,
        startingMessage,
        avatarUrl,
      });
      await axios.post("/api/savecontext", {
        assistantId,
        documents: dataFields,
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
        return (
          <Card>
            <CardHeader>
              <CardTitle>Assistant Details</CardTitle>
              <CardDescription>
                Provide basic information about your assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Assistant Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter assistant name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Assistant Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short one-line description"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assistantType">Assistant Type</Label>
                <RadioGroup
                  value={assistantType}
                  onValueChange={(value) =>
                    setAssistantType(value as AssistantType)
                  }
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Support" id="support" />
                    <Label htmlFor="support">Support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sales" id="sales" />
                    <Label htmlFor="sales">Sales</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Technical" id="technical" />
                    <Label htmlFor="technical">Technical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="General" id="general" />
                    <Label htmlFor="general">General</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Custom" id="custom" />
                    <Label htmlFor="custom">Custom</Label>
                  </div>
                </RadioGroup>
                {assistantType === "Custom" && (
                  <Input
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    placeholder="Enter custom assistant type"
                    className="mt-2"
                    required={assistantType === "Custom"}
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="functionality">Functionality</Label>
                <Textarea
                  id="functionality"
                  value={functionality}
                  onChange={(e) => setFunctionality(e.target.value)}
                  placeholder="Describe how the assistant should function"
                  required
                />
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how your assistant's chat interface looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-12 p-1"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#478ACD"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-12 h-12 p-1"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    placeholder="#0A0A15"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startingMessage">Starting Message</Label>
                <Input
                  id="startingMessage"
                  value={startingMessage}
                  onChange={(e) => setStartingMessage(e.target.value)}
                  placeholder="Enter starting message"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={avatarUrl} alt="Assistant Avatar" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Select onValueChange={(value) => setAvatarUrl(value)}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select avatar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="/avatars/avatar1.png">
                          Avatar 1
                        </SelectItem>
                        <SelectItem value="/avatars/avatar2.png">
                          Avatar 2
                        </SelectItem>
                        <SelectItem value="/avatars/avatar3.png">
                          Avatar 3
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <CldUploadWidget
                      uploadPreset="ml_default"
                      onSuccess={(result) => {
                        console.log(result);
                        if (result.info && typeof result.info !== "string") {
                          const url = getCldImageUrl({
                            src: result.info.public_id,
                          });
                          setAvatarUrl(url);
                        }
                      }}
                    >
                      {({ open }) => {
                        return <p onClick={() => open()}>Upload Avatar</p>;
                      }}
                    </CldUploadWidget>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Training Data</CardTitle>
              <CardDescription>
                Add data fields to train your assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dataFields.map((field, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Data Field {index + 1}
                    </CardTitle>
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDataField(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${index}`}>Title</Label>
                        <Input
                          id={`title-${index}`}
                          value={field.metadata.title}
                          onChange={(e) =>
                            updateDataField(index, "title", e.target.value)
                          }
                          placeholder="Enter data field title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>
                          Description
                        </Label>
                        <Input
                          id={`description-${index}`}
                          value={field.metadata.description}
                          onChange={(e) =>
                            updateDataField(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter data field description"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`pageContent-${index}`}>
                        Page Content
                      </Label>
                      <Textarea
                        id={`pageContent-${index}`}
                        value={field.pageContent}
                        onChange={(e) =>
                          updateDataField(index, "pageContent", e.target.value)
                        }
                        placeholder="Enter training data"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addDataField}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Data Field
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  const nextStep = () => {
    setDirection(1);
    setStep((prevStep) => Math.min(prevStep + 1, 3));
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
              setName("");
              setDescription("");
              setFunctionality("");
              setAssistantType("Support");
              setCustomType("");
              setDataFields([
                { pageContent: "", metadata: { title: "", description: "" } },
              ]);
              setPrimaryColor("#478ACD");
              setSecondaryColor("#0A0A15");
              setStartingMessage("Hey! How can I help you today?");
              setAvatarUrl("/placeholder.svg");
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
          <form
            onSubmit={handleSubmit}
            className="space-y-6 h-[700px] flex flex-col"
          >
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Assistant"}
                </Button>
              )}
            </div>
          </form>
        </div>
        <div className="w-full lg:w-[30%] lg:sticky lg:top-6 h-[550px]">
          <ChatPreview
            name={name}
            description={description}
            startingMessage={startingMessage}
            avatarUrl={avatarUrl}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
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
