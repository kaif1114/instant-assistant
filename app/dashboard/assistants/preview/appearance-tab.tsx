"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Assistants } from "@prisma/client";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export function AppearanceTab({
  Assistant,
}: {
  Assistant: Partial<Assistants>;
}) {
  const [currentAssistant, setCurrentAssistant] = useState(Assistant);
  const [data, setData] = useState(Assistant);
  const [isLoading, setIsLoading] = useState(false);

  const hasChanges = () => {
    return Object.keys(data).some((key) => {
      // @ts-ignore - we know these keys exist
      return data[key] !== currentAssistant[key];
    });
  };

  const updateData = (update: Partial<typeof data>) => {
    setData((current) => ({ ...current, ...update }));
  };

  const handleSubmit = async () => {
    const loadingToast = toast.loading("Updating assistant settings...");
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `/api/assistants/${Assistant.assistantId}`,
        data
      );
      setCurrentAssistant(response.data.updated);
      setData(response.data.updated);
      toast.dismiss(loadingToast);
      toast.success("Assistant settings updated successfully!", {
        duration: 6000,
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to update assistant settings.", {
        duration: 6000,
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          style: {
            borderRadius: "10px",
            padding: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
      <div className="space-y-6">
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
                value={data.name}
                onChange={(e) => updateData({ name: e.target.value })}
                placeholder="Enter assistant name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Assistant Description</Label>
              <Input
                id="description"
                value={data.description}
                onChange={(e) => updateData({ description: e.target.value })}
                placeholder="Short one-line description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assistantType">Assistant Type</Label>
              <RadioGroup
                value={data.Type}
                onValueChange={(value) => updateData({ Type: value })}
                className="flex flex-col space-y-1"
              >
                {["Support", "Sales", "Technical", "General", "Custom"].map(
                  (type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={type.toLowerCase()} />
                      <Label htmlFor={type.toLowerCase()}>{type}</Label>
                    </div>
                  )
                )}
              </RadioGroup>
              {data.Type === "Custom" && (
                <Input
                  value={data.Type}
                  onChange={(e) => updateData({ Type: e.target.value })}
                  placeholder="Enter custom assistant type"
                  className="mt-2"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="functionality">Functionality</Label>
              <Textarea
                id="functionality"
                value={data.functionality}
                onChange={(e) => updateData({ functionality: e.target.value })}
                placeholder="Describe how the assistant should function"
              />
            </div>
          </CardContent>
        </Card>

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
                  value={data.primaryColor}
                  onChange={(e) => updateData({ primaryColor: e.target.value })}
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={data.primaryColor}
                  onChange={(e) => updateData({ primaryColor: e.target.value })}
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
                  value={data.secondaryColor}
                  onChange={(e) =>
                    updateData({ secondaryColor: e.target.value })
                  }
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={data.secondaryColor}
                  onChange={(e) =>
                    updateData({ secondaryColor: e.target.value })
                  }
                  placeholder="#0A0A15"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startingMessage">Starting Message</Label>
              <Input
                id="startingMessage"
                value={data.startingMessage}
                onChange={(e) =>
                  updateData({ startingMessage: e.target.value })
                }
                placeholder="Enter starting message"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={data.avatarUrl} alt="Assistant Avatar" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Select
                    value={data.avatarUrl}
                    onValueChange={(value) => updateData({ avatarUrl: value })}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select avatar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Assistant.avatarUrl!}>
                        Custom Avatar
                      </SelectItem>
                      {[1, 2, 3].map((num) => (
                        <SelectItem
                          key={num}
                          value={`https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar${num}.jpg`}
                        >
                          Avatar {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                onClick={handleSubmit}
                disabled={!hasChanges() || isLoading}
                className="mt-6 relative"
              >
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Updating...</span>
                  </motion.div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </motion.div>

            {/* {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-lg p-6 shadow-xl"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                      className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
                    />
                    <p className="text-sm text-gray-600">
                      Updating Assistant...
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )} */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
