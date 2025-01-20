"use client";

import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Globe, FileText, Sparkles, Plus, BookText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelectedAssistantStore } from "../store";
import axios from "axios";
import { pricingPlanContext } from "../../pricingPlanContext";
import { set } from "zod";

interface ManualInput {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface Website {
  id: string;
  url: string;
}

interface File {
  id: string;
  name: string;
  size: string;
}
interface Data {
  textFieldsData: {
    id: string;
    text: string;
    description: string;
    title: string;
    new?: boolean;
  }[];
  otherSources: {
    source: string;
    type: string;
    id: string;
    new?: boolean;
  }[];
  characterCount: {
    charactersUsed: number;
  };
}

const initialData = {
  textFieldsData: [
    {
      id: "1",
      title: "Company Overview",
      description: "Basic information about our company",
      content: "We are a technology company focused on AI solutions...",
      new: false,
    },
  ],
  websites: [
    {
      id: "1",
      url: "https://example.com/docs",
      new: false,
    },
  ],
  files: [
    {
      id: "1",
      name: "product-manual.pdf",
      size: "2.5 MB",
      new: false,
    },
  ],
};

type KnowledgeType = "manual" | "websites" | "files";

export function KnowledgeBaseTab() {
  const charactersLimit = useContext(pricingPlanContext);
  const { selectedAssistant } = useSelectedAssistantStore();
  const [data, setData] = useState<Data | null>(null);
  const [selectedType, setSelectedType] = useState<KnowledgeType>("manual");
  const [isRetraining, setIsRetraining] = useState(false);
  const [newManualInput, setNewManualInput] = useState({
    title: "",
    description: "",
    text: "",
  });
  const [newWebsite, setNewWebsite] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [showAddForm, setShowAddForm] = useState<KnowledgeType | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getKnowledgeBase() {
      if (selectedAssistant) {
        const response = await axios.get(
          `/api/getcontext?assistantId=${selectedAssistant?.assistantId}`
        );
        return response.data;
      }
    }
    getKnowledgeBase().then((data) => {
      if (data) {
        console.log("Data: ", data);
        setData(data);
      }
    });
  }, [selectedAssistant]);

  useEffect(() => {
    if (data != null && data.textFieldsData.length > 0) {
      console.log("Data: ", data);
      const totalCharacters = data.textFieldsData.reduce(
        (acc, input) => acc + input.text.length,
        0
      );
      setData((prev) => ({ ...prev!, charactersUsed: totalCharacters }));
      setError(
        totalCharacters > charactersLimit ? "Character limit exceeded" : null
      );
    }
  }, [data?.textFieldsData, charactersLimit]);

  const handleAddManualInput = () => {
    if (
      newManualInput.title &&
      newManualInput.description &&
      newManualInput.text
    ) {
      const newInput = {
        id: Math.random().toString(36).substr(2, 9),
        new: true,
        ...newManualInput,
      };
      if (data) {
        setData((prev) => ({
          ...prev!,
          textFieldsData: [...prev!.textFieldsData, newInput],
        }));
      }
      setNewManualInput({ title: "", description: "", text: "" });
      setShowAddForm(null);
      setHasChanges(true);
    }
  };

  const handleAddWebsite = () => {
    if (newWebsite) {
      const newSite = {
        id: Math.random().toString(36).substr(2, 9),
        new: true,
        type: "website",
        source: newWebsite,
      };
      setData((prev) => ({
        ...prev!,
        otherSources: [...prev!.otherSources, newSite],
      }));
      setNewWebsite("");
      setShowAddForm(null);
      setHasChanges(true);
    }
  };

  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFileEntry = {
        id: Math.random().toString(36).substr(2, 9),
        source: file.name,
        new: true,
        type: "file",
        // size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      };
      setData((prev) => ({
        ...prev!,
        otherSources: [...prev!.otherSources, newFileEntry],
      }));
      setNewFile(null);
      setShowAddForm(null);
      setHasChanges(true);
      event.target.value = "";
    }
  };

  const handleRemoveManualInput = (id: string) => {
    setData((prev) => ({
      ...prev!,
      textFieldsData: prev!.textFieldsData.filter((input) => input.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRemoveWebsite = (id: string) => {
    setData((prev) => ({
      ...prev!,
      otherSources: prev!.otherSources.filter((website) => website.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRemoveFile = (id: string) => {
    setData((prev) => ({
      ...prev!,
      otherSources: prev!.otherSources.filter((file) => file.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRetrain = async () => {
    setIsRetraining(true);

    for (const key in data) {
      let newData: {
        title: string;
        description: string;
        id: string;
        text: string;
        new?: boolean;
      }[] = [];
      if (key === "textFieldsData") {
        newData = data[key].filter((input) => input.new);
      }
      console.log(newData);
    }

    setIsRetraining(false);
    setHasChanges(false);
  };

  const percentage =
    (selectedAssistant?.charactersUsed! / charactersLimit) * 100;
  const remaining = charactersLimit - selectedAssistant?.charactersUsed!;

  const navigationItems = [
    {
      type: "manual",
      label: "Manual Input",
      icon: BookText,
      count: data?.textFieldsData.length,
    },
    {
      type: "websites",
      label: "Websites",
      icon: Globe,
      count: data?.otherSources.length,
    },
    {
      type: "files",
      label: "Files",
      icon: FileText,
      count: data?.otherSources.length,
    },
  ] as const;

  return (
    <div className="flex gap-6 h-[calc(100vh-200px)]">
      {/* Left Navigation */}
      <Card className="w-60 flex-shrink-0">
        <CardContent className="p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.type}
                onClick={() => setSelectedType(item.type)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors",
                  selectedType === item.type
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-900"
                )}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Middle Content */}
      <Card className="flex-1 overflow-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {
                navigationItems.find((item) => item.type === selectedType)
                  ?.label
              }
            </h2>
            <Button
              onClick={() => setShowAddForm(selectedType)}
              disabled={showAddForm === selectedType}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add{" "}
              {selectedType === "manual"
                ? "Manual Input"
                : selectedType === "websites"
                  ? "Website"
                  : "File"}
            </Button>
          </div>

          {selectedType === "manual" && (
            <div className="space-y-4">
              {showAddForm === "manual" && (
                <div className="space-y-4 border-b pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newManualInput.title}
                        onChange={(e) =>
                          setNewManualInput((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Enter title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newManualInput.description}
                        onChange={(e) =>
                          setNewManualInput((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Enter description"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newManualInput.text}
                      onChange={(e) =>
                        setNewManualInput((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder="Enter main text"
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleAddManualInput} className="w-full">
                    Add Manual Input
                  </Button>
                </div>
              )}
              {data?.textFieldsData.map((input) => (
                <div
                  key={input.id}
                  className="p-4 rounded-lg border group relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveManualInput(input.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="space-y-2">
                    <h3 className="font-medium">{input.title}</h3>
                    <p className="text-sm text-gray-500">{input.description}</p>
                    <p className="text-sm">{input.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedType === "websites" && (
            <div className="space-y-4">
              {showAddForm === "websites" && (
                <div className="flex gap-2 border-b pb-4">
                  <Input
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder="Enter website URL"
                  />
                  <Button onClick={handleAddWebsite}>Add Website</Button>
                </div>
              )}
              {data?.otherSources.map((dataSource) => {
                if (dataSource.type == "website") {
                  return (
                    <div
                      key={dataSource.id}
                      className="flex items-center justify-between p-3 rounded-lg border group"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{dataSource.source}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveWebsite(dataSource.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                }
              })}
            </div>
          )}

          {selectedType === "files" && (
            <div className="space-y-4">
              {showAddForm === "files" && (
                <div className="border-b pb-4">
                  <Label htmlFor="file-upload" className="block mb-2">
                    Upload File
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleAddFile}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </div>
              )}
              {data?.otherSources.map((dataSource) => {
                if (dataSource.type == "file") {
                  return (
                    <div
                      key={dataSource.id}
                      className="flex items-center justify-between p-3 rounded-lg border group"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{dataSource.source}</span>
                        {/* <span className="text-sm text-gray-500">
                          ({dataSource.size})
                        </span> */}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveFile(dataSource.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right Side */}
      <div className="w-60 flex-shrink-0 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Character Usage</span>
                <span className="text-blue-600">
                  {selectedAssistant?.charactersUsed!} /{" "}
                  {charactersLimit.toLocaleString()}
                </span>
              </div>
              <Progress value={percentage} className="h-1" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {remaining.toLocaleString()} remaining
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-blue-600 hover:text-blue-700"
                >
                  <Sparkles className="h-3 w-3 mr-2" />
                  Upgrade
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button
          onClick={handleRetrain}
          disabled={isRetraining || !hasChanges || !!error}
          className="w-full bg-black text-white hover:bg-black/90"
        >
          {isRetraining ? "Retraining..." : "Retrain Assistant"}
        </Button>
      </div>
    </div>
  );
}
