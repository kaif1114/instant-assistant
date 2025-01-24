"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface CharacterLimitProps {
  used: number;
  limit: number;
}

export function CharacterLimit({ used, limit }: CharacterLimitProps) {
  const percentage = (used / limit) * 100;
  const remaining = limit - used;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-900">
        <span>Character Usage</span>
        <span className="text-blue-600">
          {used.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <Progress value={percentage} className="h-1" />
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {remaining.toLocaleString()} remaining
        </span>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-blue-600 hover:text-blue-700"
        >
          <Sparkles className="h-3 w-3 mr-2" />
          Upgrade
        </Button>
      </div>
    </div>
  );
}
