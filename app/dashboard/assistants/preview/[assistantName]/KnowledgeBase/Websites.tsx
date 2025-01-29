"use client";

import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, Plus, Globe } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface Website {
  id: string;
  url: string;
}

interface WebsitesProps {
  data: Website[];
  onUpdate: (data: Website[]) => void;
}

const ITEMS_PER_PAGE = 5;

export function Websites({ data, onUpdate }: WebsitesProps) {
  const [websites, setWebsites] = useState<Website[]>(data);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const handleAdd = () => {
    const newWebsite = {
      id: Math.random().toString(36).substr(2, 9),
      url: "",
    };
    setWebsites([...websites, newWebsite]);
  };

  const handleRemove = (id: string) => {
    setWebsites(websites.filter((site) => site.id !== id));
    onUpdate(websites.filter((site) => site.id !== id));
  };

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, websites.length));
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Websites</h2>
          <Button
            onClick={handleAdd}
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Website
          </Button>
        </div>

        {websites.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No websites added. Click &apos;Add Website&apos; to get started.
          </div>
        ) : (
          <ScrollArea className="h-[200px]">
            <div className="space-y-2 pr-4">
              {websites.slice(0, displayCount).map((website) => (
                <div
                  key={website.id}
                  className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg group"
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <Globe className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-900 truncate">
                      {website.url}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemove(website.id)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              ))}
            </div>

            {websites.length > displayCount && (
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
