"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Upload, Globe, FileText } from "lucide-react";

interface AddDataDialogProps {
  onAddManualInput: (data: {
    title: string;
    description: string;
    content: string;
  }) => void;
  onAddWebsite: (url: string) => void;
  onAddFile: (file: File) => void;
  initialTab?: "manual" | "websites" | "files";
}

export function AddDataDialog({
  onAddManualInput,
  onAddWebsite,
  onAddFile,
  initialTab = "manual",
}: AddDataDialogProps) {
  const [open, setOpen] = useState(false);
  const [manualInput, setManualInput] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleManualInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddManualInput(manualInput);
    setManualInput({ title: "", description: "", content: "" });
    setOpen(false);
  };

  const handleWebsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddWebsite(websiteUrl);
    setWebsiteUrl("");
    setOpen(false);
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onAddFile(selectedFile);
      setSelectedFile(null);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Knowledge Source</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={initialTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="websites">Website</TabsTrigger>
            <TabsTrigger value="files">File</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <form onSubmit={handleManualInputSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={manualInput.title}
                  onChange={(e) =>
                    setManualInput((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={manualInput.description}
                  onChange={(e) =>
                    setManualInput((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={manualInput.content}
                  onChange={(e) =>
                    setManualInput((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Add Manual Input
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="websites">
            <form onSubmit={handleWebsiteSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://"
                      className="pl-8"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Add Website
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="files">
            <form onSubmit={handleFileSubmit} className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="file">File</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <div className="text-center">
                        {selectedFile ? (
                          <p className="text-sm text-gray-900">
                            {selectedFile.name}
                          </p>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-900">
                              Upload a file
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, TXT up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                      accept=".pdf,.doc,.docx,.txt"
                      required
                    />
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={!selectedFile}>
                Add File
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
