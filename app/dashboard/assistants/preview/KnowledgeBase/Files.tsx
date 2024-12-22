"use client";

import { Button } from "@/components/ui/button";
import { FileText, Trash2, Upload, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface File {
  id: string;
  name: string;
  size: string;
}

interface FilesProps {
  data: File[];
  onUpdate: (data: File[]) => void;
}

const ITEMS_PER_PAGE = 5;

export function Files({ data, onUpdate }: FilesProps) {
  const [files, setFiles] = useState<File[]>(data);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      }));
      setFiles([...files, ...newFiles]);
      onUpdate([...files, ...newFiles]);
    }
  };

  const handleRemove = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
    onUpdate(files.filter((file) => file.id !== id));
  };

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, files.length));
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Files</h2>

        {files.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No files uploaded. Use the upload area below to add files.
          </div>
        ) : (
          <ScrollArea className="h-[200px] mb-4">
            <div className="space-y-2 pr-4">
              {files.slice(0, displayCount).map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg group"
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-900 truncate">
                      {file.name}
                    </span>
                    <span className="text-sm text-gray-500">({file.size})</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    onClick={() => handleRemove(file.id)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              ))}
            </div>

            {files.length > displayCount && (
              <Button
                variant="outline"
                onClick={loadMore}
                className="w-full mt-4 text-gray-600"
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Load More
              </Button>
            )}
          </ScrollArea>
        )}

        <div className="border border-dashed border-gray-200 rounded-lg p-6">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">
                  Upload files
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, TXT up to 10MB each
                </p>
              </div>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
