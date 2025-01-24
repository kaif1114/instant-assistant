"use client";

import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface ManualInputData {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface ManualInputProps {
  data: ManualInputData[];
  onUpdate: (data: ManualInputData[]) => void;
}

const ITEMS_PER_PAGE = 5;

export function ManualInput({ data, onUpdate }: ManualInputProps) {
  const [inputs, setInputs] = useState<ManualInputData[]>(data);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const handleRemove = (id: string) => {
    setInputs(inputs.filter((input) => input.id !== id));
    onUpdate(inputs.filter((input) => input.id !== id));
  };

  const handleAdd = () => {
    const newInput = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      description: "",
      content: "",
    };
    setInputs([...inputs, newInput]);
  };

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, inputs.length));
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Manual Input Data
          </h2>
          <Button
            onClick={handleAdd}
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        {inputs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No manual input data. Click 'Add New' to get started.
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-300px)] pr-4">
            <div className="space-y-4">
              {inputs.slice(0, displayCount).map((input) => (
                <Card key={input.id} className="relative group">
                  <CardContent className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemove(input.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Title
                        </label>
                        <p className="mt-1 text-gray-900">{input.title}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Description
                        </label>
                        <p className="mt-1 text-gray-900">
                          {input.description}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Content
                        </label>
                        <p className="mt-1 text-gray-900 whitespace-pre-wrap">
                          {input.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {inputs.length > displayCount && (
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
      </CardContent>
    </Card>
  );
}
