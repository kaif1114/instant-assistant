"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axios from "axios";
import { BookText, FileText, Globe, Plus, Sparkles, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { pricingPlanContext } from "../../../../../providers/pricingPlanContext";
import { useSelectedAssistantStore } from "../../store";
import { useQuery } from "@tanstack/react-query";


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

async function getKnowledgeBase(assistantId: string) {
  const response = await axios.get(
    `/api/getcontext?assistantId=${assistantId}`
  );
  return response.data

}

type KnowledgeType = "manual" | "websites" | "files";

export function KnowledgeBaseTab() {

  const charactersLimit = useContext(pricingPlanContext);
  const { selectedAssistant } = useSelectedAssistantStore();

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
  // const [isLoading, setIsLoading] = useState(true);



  const { data, isLoading, isError } = useQuery<Data>({
    queryKey: ['knowledgeBase', selectedAssistant?.assistantId],
    queryFn: () => getKnowledgeBase(selectedAssistant?.assistantId!),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,

  })

  const [knowledgeBase, setKnowledgeBase] = useState<Data | undefined>(data);
  useEffect(() => {
    setKnowledgeBase(data)
  }, [selectedAssistant, data]);

  useEffect(() => {
    if (knowledgeBase && knowledgeBase.textFieldsData.length > 0) {

      const totalCharacters = knowledgeBase.textFieldsData.reduce(
        (acc, input) => acc + input.text.length,
        0
      );
      if (totalCharacters > charactersLimit) {
        setError("Character limit exceeded");
      } else {
        setError(null);
      }
    }
  }, [knowledgeBase?.textFieldsData, charactersLimit]);

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
        setKnowledgeBase((prev) => ({
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
      setKnowledgeBase((prev) => ({
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
      setKnowledgeBase((prev) => ({
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
    setKnowledgeBase((prev) => ({
      ...prev!,
      textFieldsData: prev!.textFieldsData.filter((input) => input.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRemoveWebsite = (id: string) => {
    setKnowledgeBase((prev) => ({
      ...prev!,
      otherSources: prev!.otherSources.filter((website) => website.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRemoveFile = (id: string) => {
    setKnowledgeBase((prev) => ({
      ...prev!,
      otherSources: prev!.otherSources.filter((file) => file.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRetrain = async () => {
    setIsRetraining(true);

    for (const key in knowledgeBase) {
      let newData: {
        title: string;
        description: string;
        id: string;
        text: string;
        new?: boolean;
      }[] = [];
      if (key === "textFieldsData") {
        newData = knowledgeBase[key].filter((input) => input.new);
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
      count: knowledgeBase?.textFieldsData.length,
    },
    {
      type: "websites",
      label: "Websites",
      icon: Globe,
      count: knowledgeBase?.otherSources.filter((source) => source.type == "url").length,
    },
    {
      type: "files",
      label: "Files",
      icon: FileText,
      count: knowledgeBase?.otherSources.filter((source) => source.type == "file").length,
    },
  ] as const;

  if (isLoading) {
    return (
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        <Card className="w-60 flex-shrink-0">
          <CardContent className="p-4">
            <div className="space-y-2 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 rounded-lg w-full"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="h-9 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-200 rounded-lg w-full animate-pulse"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="w-60 flex-shrink-0 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-2 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              </div>
            </CardContent>
          </Card>
          <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
        </div>
      </div>
    );
  }

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
              {knowledgeBase?.textFieldsData.map((input) => (
                <ScrollArea key={input.id} className="h-max w-full rounded-md border p-4">
                  <div
                    className="relative group mb-4 pb-4 border-b last:border-b-0"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -right-0 -top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveManualInput(input.id)}
                    >
                      <X className="h-4 w-4 " />
                    </Button>
                    <h3 className="text-lg font-semibold">
                      {input.title}
                    </h3>

                    <p className="text-sm mb-2">
                      {input.description}
                    </p>
                    <details>
                      <summary className="cursor-pointer text-sm font-medium">
                        View Content
                      </summary>
                      <pre className="mt-2 whitespace-pre-wrap text-sm">
                        {input.text}
                      </pre>
                    </details>
                  </div>
                </ScrollArea>
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
              {knowledgeBase?.otherSources.map((dataSource) => {
                if (dataSource.type == "url") {
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
              {knowledgeBase?.otherSources.map((dataSource) => {
                if (dataSource.type == "file") {
                  return (
                    <div
                      key={dataSource.id}
                      className="flex items-center justify-between p-3 rounded-lg border group"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{dataSource.source}</span>
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
