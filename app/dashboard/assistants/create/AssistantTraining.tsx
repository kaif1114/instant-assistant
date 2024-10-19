"use client";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { PlusCircle, X } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface DataFieldEntry {
  pageContent: string;
  metadata: {
    title: string;
    description: string;
  };
}

type AssistantType = "Support" | "Sales" | "Technical" | "General" | "Custom";

export default function AssistantTrainingPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [functionality, setFunctionality] = useState("");
  const [assistantType, setAssistantType] = useState<AssistantType>("Support");
  const [customType, setCustomType] = useState("");
  const [dataFields, setDataFields] = useState<DataFieldEntry[]>([
    { pageContent: "", metadata: { title: "", description: "" } },
  ]);

  const { user } = useUser();
  const assistantId = uuidv4();

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
    console.log({ name, description, functionality, dataFields });
    console.log(assistantId, user?.id);
    try {
      await axios.post("/api/assistants/create", {
        assistantId,
        name,
        description,
        assistantType,
        userId: user?.id,
      });
      await axios.post("/api/savecontext", {
        assistantId,
        documents: dataFields,
      });

      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="container py-6 space-y-6 px-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Create Your AI Assistant
          </h2>
          <p className="text-muted-foreground">
            Create and customize your own chatbot assistant
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <Button type="submit" className="w-full">
            Create Assistant
          </Button>
        </form>
      </div>
    </ScrollArea>
  );
}
