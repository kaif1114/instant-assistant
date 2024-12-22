"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Globe, FileText, Sparkles, Plus, BookText, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

const initialData = {
  manualInputs: [
    {
      id: "1",
      title: "Company Overview",
      description: "Basic information about our company",
      content: "We are a technology company focused on AI solutions...",
    },
  ],
  websites: [
    {
      id: "1",
      url: "https://example.com/docs",
    },
  ],
  files: [
    {
      id: "1",
      name: "product-manual.pdf",
      size: "2.5 MB",
    },
  ],
  characterLimit: 100000,
  characterCount: 25000,
};

type KnowledgeType = "manual" | "websites" | "files";

export function KnowledgeBaseTab() {
  const [data, setData] = useState(initialData);
  const [selectedType, setSelectedType] = useState<KnowledgeType>("manual");
  const [isRetraining, setIsRetraining] = useState(false);
  const [newManualInput, setNewManualInput] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [newWebsite, setNewWebsite] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [showAddForm, setShowAddForm] = useState<KnowledgeType | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const totalCharacters = data.manualInputs.reduce(
      (acc, input) =>
        acc +
        input.title.length +
        input.description.length +
        input.content.length,
      0
    );
    setData((prev) => ({ ...prev, characterCount: totalCharacters }));
    setError(
      totalCharacters > data.characterLimit ? "Character limit exceeded" : null
    );
  }, [data.manualInputs, data.characterLimit]);

  const handleAddManualInput = () => {
    if (
      newManualInput.title &&
      newManualInput.description &&
      newManualInput.content
    ) {
      const newInput = {
        id: Math.random().toString(36).substr(2, 9),
        ...newManualInput,
      };
      setData((prev) => ({
        ...prev,
        manualInputs: [...prev.manualInputs, newInput],
      }));
      setNewManualInput({ title: "", description: "", content: "" });
      setShowAddForm(null);
      setHasChanges(true);
    }
  };

  const handleAddWebsite = () => {
    if (newWebsite) {
      const newSite = {
        id: Math.random().toString(36).substr(2, 9),
        url: newWebsite,
      };
      setData((prev) => ({
        ...prev,
        websites: [...prev.websites, newSite],
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
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      };
      setData((prev) => ({
        ...prev,
        files: [...prev.files, newFileEntry],
      }));
      setNewFile(null);
      setShowAddForm(null);
      setHasChanges(true);
      event.target.value = "";
    }
  };

  const handleRemoveManualInput = (id: string) => {
    setData((prev) => ({
      ...prev,
      manualInputs: prev.manualInputs.filter((input) => input.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRemoveWebsite = (id: string) => {
    setData((prev) => ({
      ...prev,
      websites: prev.websites.filter((website) => website.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRemoveFile = (id: string) => {
    setData((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file.id !== id),
    }));
    setHasChanges(true);
  };

  const handleRetrain = async () => {
    setIsRetraining(true);
    // Simulate retraining
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRetraining(false);
    setHasChanges(false);
  };

  const percentage = (data.characterCount / data.characterLimit) * 100;
  const remaining = data.characterLimit - data.characterCount;

  const navigationItems = [
    {
      type: "manual",
      label: "Manual Input",
      icon: BookText,
      count: data.manualInputs.length,
    },
    {
      type: "websites",
      label: "Websites",
      icon: Globe,
      count: data.websites.length,
    },
    { type: "files", label: "Files", icon: FileText, count: data.files.length },
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
                      value={newManualInput.content}
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
              {data.manualInputs.map((input) => (
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
                    <p className="text-sm">{input.content}</p>
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
              {data.websites.map((website) => (
                <div
                  key={website.id}
                  className="flex items-center justify-between p-3 rounded-lg border group"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{website.url}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveWebsite(website.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
              {data.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg border group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-sm text-gray-500">({file.size})</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
                  {data.characterCount.toLocaleString()} /{" "}
                  {data.characterLimit.toLocaleString()}
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
