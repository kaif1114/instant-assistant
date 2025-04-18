"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useSelectedAssistantStore } from "../store";

export function InstallTab() {
  const { selectedAssistant } = useSelectedAssistantStore();
  const [copied, setCopied] = useState(false);

  const scriptCode = `<script>
  (function () {
    var s = document.createElement("script");
    s.src = "${process.env.NEXT_PUBLIC_DOMAIN}/embed.js";
    s.onload = function () {
      window.initAIChat({
        assistantId: "${selectedAssistant?.assistantId}",
      });
    };
    document.body.appendChild(s);
  })();
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Install Assistant</CardTitle>
        <CardDescription>
          Add your AI assistant to any website with a single line of code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Your Assistant ID</h3>
          <p className="text-sm text-muted-foreground">
            {selectedAssistant?.assistantId}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Installation Script</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="space-x-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{scriptCode}</code>
          </pre>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Installation Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Copy the installation script above</li>
            <li>
              Paste it into your website&apos;s HTML, just before the closing{" "}
              {"</body>"} tag
            </li>
            <li>Save and deploy your changes</li>
            <li>
              The chat widget will appear in the bottom right corner of your
              website
            </li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
