"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SelectedFile {
  file: File;
  characterCount: number;
}

interface SelectedFilesListProps {
  files: SelectedFile[];
  onRemove: (index: number) => void;
  uploaded: boolean;
}

const SelectedFilesList: React.FC<SelectedFilesListProps> = ({
  files,
  onRemove,
  uploaded = false,
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-secondary p-2 rounded"
          >
            <span>{file.file.name}</span>
            {!uploaded && (
              <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedFilesList;
