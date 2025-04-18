"use client";
import { Data, IOtherSource } from "@/app/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookText, FileText, Globe, Plus, Sparkles, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { pricingPlanContext } from "../../../../../providers/pricingPlanContext";
import { useSelectedAssistantStore } from "../../store";

import { FileMutation } from "@/hooks/FileMutation";
import { TextFieldMutation } from "@/hooks/TextFieldMutation";
import { UrlMutation } from "@/hooks/UrlMutation";
import { LoadingOverlay } from "./LoadingOverlay";

interface File {
  id: string;
  name: string;
  size: string;
}

async function getKnowledgeBase(assistantId: string) {
  const response = await axios.get(
    `/api/getcontext?assistantId=${assistantId}`
  );
  return response.data;
}

type KnowledgeType = "manual" | "url" | "file";

interface NewInputState {
  manual: {
    title: string;
    description: string;
    text: string;
  };
  url: string;
  file: File | null;
}

interface IContextToRemove {
  textfields: string[];
  urls: string[];
  files: string[];
}

export function KnowledgeBaseTab() {
  const pricingPlan = useContext(pricingPlanContext);
  const { selectedAssistant, setSelectedAssistant } =
    useSelectedAssistantStore();

  const [selectedType, setSelectedType] = useState<KnowledgeType>("manual");
  const [isRetraining, setIsRetraining] = useState(false);
  const [newInput, setNewInput] = useState<NewInputState>({
    manual: {
      title: "",
      description: "",
      text: "",
    },
    url: "",
    file: null,
  });
  const [contextToRemove, setContextToRemove] = useState<IContextToRemove>({
    textfields: [],
    urls: [],
    files: [],
  });
  const [showAddForm, setShowAddForm] = useState<KnowledgeType | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    mutateAsync: mutateTextFields,
    isError: isTextFieldMutationError,
    error: textFieldMutationError,
    isPending: isTextFieldPending,
    isSuccess: isTextFieldSuccess,
  } = TextFieldMutation();
  const {
    mutateAsync: mutateUrl,
    isError: isUrlMutationError,
    error: urlMutationError,
    isPending: isUrlPending,
    isSuccess: isUrlSuccess,
  } = UrlMutation();
  const {
    mutateAsync: mutateFile,
    isError: isFileMutationError,
    error: fileMutationError,
    isPending: isFilePending,
    isSuccess: isFileSuccess,
  } = FileMutation();

  const { data, isLoading, isFetching, refetch } = useQuery<Data>({
    queryKey: ["knowledgeBase", selectedAssistant?.assistantId],
    queryFn: async () => {
      if (!selectedAssistant?.assistantId) {
        throw new Error("No assistant selected");
      }
      return getKnowledgeBase(selectedAssistant.assistantId);
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!selectedAssistant?.assistantId,
  });

  const [knowledgeBase, setKnowledgeBase] = useState<Data | undefined>(data);

  useEffect(() => {
    if (!hasChanges) {
      setKnowledgeBase(data);
    }
  }, [data, hasChanges]);

  useEffect(() => {
    if (
      knowledgeBase?.textFieldsData.length &&
      selectedAssistant?.charactersUsed &&
      pricingPlan
    ) {
      const totalCharacters = knowledgeBase.textFieldsData.reduce(
        (acc, input) => acc + input.text.length,
        0
      );
      if (totalCharacters > pricingPlan.charactersLimit) {
        setError("Character limit exceeded");
      } else {
        setError(null);
      }
    }
  }, [
    knowledgeBase?.textFieldsData,
    pricingPlan?.charactersLimit,
    selectedAssistant?.charactersUsed,
    pricingPlan,
  ]);

  const handleAddManualInput = () => {
    if (
      newInput.manual.title &&
      newInput.manual.description &&
      newInput.manual.text &&
      knowledgeBase
    ) {
      const newInputData = {
        id: Date.now().toString(),
        new: true,
        ...newInput.manual,
      };
      console.log("NewInputData: ", newInputData);
      setKnowledgeBase((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          textFieldsData: [...prev.textFieldsData, newInputData],
        };
      });
      if (selectedAssistant) {
        setSelectedAssistant({
          ...selectedAssistant,
          charactersUsed:
            selectedAssistant.charactersUsed + newInput.manual.text.length,
        });
      }
      setNewInput((prev) => ({
        ...prev,
        manual: { title: "", description: "", text: "" },
      }));
      setShowAddForm(null);
      setHasChanges(true);
    }
  };

  const handleAddurl = () => {
    if (newInput.url && knowledgeBase) {
      const newSite: IOtherSource = {
        id: `${newInput.url}-${knowledgeBase.otherSources.length + 1}`,
        new: true,
        type: "url",
        source: newInput.url,
      };
      setKnowledgeBase((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          otherSources: [...prev.otherSources, newSite],
        };
      });
      setNewInput((prev) => ({ ...prev, url: "" }));
      setShowAddForm(null);
      setHasChanges(true);
    }
  };

  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFileEntry: IOtherSource = {
        id: `${file.name}-${knowledgeBase!.otherSources.length + 1}`,
        source: file.name,
        new: true,
        type: "file",
        file,
      };
      setKnowledgeBase((prev) => ({
        ...prev!,
        otherSources: [...prev!.otherSources, newFileEntry],
      }));
      setNewInput((prev) => ({ ...prev, file: null }));
      setShowAddForm(null);
      setHasChanges(true);
      event.target.value = "";
    }
  };

  const handleRemoveManualInput = (id: string) => {
    setContextToRemove((prev) => {
      return { ...prev, textfields: [...prev.textfields, `textfield-${id}`] };
    });
    setKnowledgeBase((prev) => ({
      ...prev!,
      textFieldsData: prev!.textFieldsData.filter((input) => input.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRemoveurl = (otherSource: IOtherSource) => {
    setContextToRemove((prev) => {
      return { ...prev, urls: [...prev.urls, otherSource.source] };
    });
    setKnowledgeBase((prev) => ({
      ...prev!,
      otherSources: prev!.otherSources.filter(
        (url) => url.id !== otherSource.id
      ),
    }));
    setHasChanges(true);
  };

  const handleRemoveFile = (otherSource: IOtherSource) => {
    setContextToRemove((prev) => {
      return { ...prev, files: [...prev.files, otherSource.source] };
    });
    setKnowledgeBase((prev) => ({
      ...prev!,
      otherSources: prev!.otherSources.filter(
        (file) => file.id !== otherSource.id
      ),
    }));
    setHasChanges(true);
  };

  const handleRetrain = async () => {
    if (!selectedAssistant?.assistantId || !knowledgeBase) return;

    setIsRetraining(true);
    try {
      const newTextFields = knowledgeBase.textFieldsData
        .filter((textField) => textField.new)
        .map((textField) => ({
          pageContent: textField.text,
          metadata: {
            id: textField.id,
            title: textField.title,
            description: textField.description,
          },
        }));

      console.log("textFieldsToRemove: ", contextToRemove.textfields);
      console.log("textFieldsToAdd: ", newTextFields);
      await mutateTextFields({
        textFieldDocuments: newTextFields,
        assistantId: selectedAssistant.assistantId,
        ids: true,
        textFieldsToRemove: contextToRemove.textfields,
      });

      const newUrls = knowledgeBase.otherSources
        .filter((source) => source.type === "url" && source.new)
        .map((sourceObj) => sourceObj.source);

      console.log("Urls to remove: ", contextToRemove.urls);
      await mutateUrl({
        assistantId: selectedAssistant.assistantId,
        urls: newUrls,
        urlsToRemove: contextToRemove.urls,
      });

      const newFiles = knowledgeBase.otherSources.filter(
        (source) => source.type === "file" && source.new && source.file
      );
      console.log("files to remove: ", contextToRemove.files);
      await mutateFile({
        files: newFiles,
        assistantId: selectedAssistant.assistantId,
        filesToRemove: contextToRemove.files,
      });
      setKnowledgeBase((prev) => ({
        ...prev!,
        textFieldsData: prev!.textFieldsData.map((field) => ({
          ...field,
          new: false,
        })),
        otherSources: prev!.otherSources.map((source) => ({
          ...source,
          new: false,
          file: undefined,
        })),
      }));

      await refetch();
      setContextToRemove({ textfields: [], urls: [], files: [] });
      setHasChanges(false);
    } catch (error) {
      console.error("Error during retraining:", error);
    } finally {
      setIsRetraining(false);
    }
  };

  const percentage =
    selectedAssistant?.charactersUsed && pricingPlan
      ? (selectedAssistant.charactersUsed / pricingPlan.charactersLimit) * 100
      : 0;
  const remaining =
    selectedAssistant?.charactersUsed && pricingPlan
      ? pricingPlan.charactersLimit - selectedAssistant.charactersUsed
      : 0;

  const navigationItems = [
    {
      type: "manual",
      label: "Manual Input",
      icon: BookText,
      count: knowledgeBase?.textFieldsData.length,
    },
    {
      type: "url",
      label: "urls",
      icon: Globe,
      count: knowledgeBase?.otherSources.filter(
        (source) => source.type == "url"
      ).length,
    },
    {
      type: "file",
      label: "Files",
      icon: FileText,
      count: knowledgeBase?.otherSources.filter(
        (source) => source.type == "file"
      ).length,
    },
  ] as const;

  if (isLoading) {
    return (
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        <Card className="w-60 flex-shrink-0">
          <CardContent className="p-4">
            <div className="space-y-2 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-lg w-full" />
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
    <>
      <LoadingOverlay
        isVisible={isRetraining || isFetching}
        files={{
          isProcessing: isFilePending,
          isSuccess: isFileSuccess,
          isError: isFileMutationError,
          errorMessage: fileMutationError?.message,
        }}
        websites={{
          isProcessing: isUrlPending,
          isSuccess: isUrlSuccess,
          isError: isUrlMutationError,
          errorMessage: urlMutationError?.message,
        }}
        manualInputs={{
          isProcessing: isTextFieldPending,
          isSuccess: isTextFieldSuccess,
          isError: isTextFieldMutationError,
          errorMessage: textFieldMutationError?.message,
        }}
      />
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
                  : selectedType === "url"
                  ? "url"
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
                          value={newInput.manual.title}
                          onChange={(e) =>
                            setNewInput((prev) => ({
                              ...prev,
                              manual: { ...prev.manual, title: e.target.value },
                            }))
                          }
                          placeholder="Enter title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={newInput.manual.description}
                          onChange={(e) =>
                            setNewInput((prev) => ({
                              ...prev,
                              manual: {
                                ...prev.manual,
                                description: e.target.value,
                              },
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
                        value={newInput.manual.text}
                        onChange={(e) =>
                          setNewInput((prev) => ({
                            ...prev,
                            manual: { ...prev.manual, text: e.target.value },
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
                  <ScrollArea
                    key={input.id}
                    className="h-max w-full rounded-md border p-4"
                  >
                    <div className="relative group mb-4 pb-4 border-b last:border-b-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -right-0 -top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveManualInput(input.id)}
                      >
                        <X className="h-4 w-4 " />
                      </Button>
                      <h3 className="text-lg font-semibold">{input.title}</h3>

                      <p className="text-sm mb-2">{input.description}</p>
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

            {selectedType === "url" && (
              <div className="space-y-4">
                {showAddForm === "url" && (
                  <div className="flex gap-2 border-b pb-4">
                    <Input
                      value={newInput.url}
                      onChange={(e) =>
                        setNewInput((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                      placeholder="Enter URL"
                    />
                    <Button onClick={handleAddurl}>Add URL</Button>
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
                          onClick={() => handleRemoveurl(dataSource)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  }
                })}
              </div>
            )}

            {selectedType === "file" && (
              <div className="space-y-4">
                {showAddForm === "file" && (
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
                          onClick={() => handleRemoveFile(dataSource)}
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
                    {selectedAssistant?.charactersUsed} /{" "}
                    {pricingPlan?.charactersLimit.toLocaleString() ?? "0"}
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
    </>
  );
}
