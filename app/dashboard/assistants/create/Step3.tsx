import { Document, SelectedFile } from "@/app/schemas";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ChevronLeft,
  Globe,
  Loader2,
  PlusCircle,
  Scissors,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import SelectedFilesList from "./SelectedFilesList";
import { useNewAssistantStore } from "./store";
import { KindOtterButton } from "@/components/ui/KindOtterButton";
import AnimatedTextLoader from "@/components/ui/AnimatedTextLoader";

interface Props {
  onPrevStep: () => void;
  totalCharacterCount: number;
  onUpdateCharacterCount: (count: number) => void;
  assistantId: string;
  selectedFiles: SelectedFile[];
  onSetSelectedFiles: (files: SelectedFile[]) => void;
  scrapedContent: Document[];
  onSetScrapedContent: (
    prev: Document[] | ((prev: Document[]) => Document[])
  ) => void;
  isButtonDisabled: boolean;
  onSubmit: () => void;
}

const Step3 = ({
  onPrevStep,
  onUpdateCharacterCount,
  selectedFiles,
  onSetSelectedFiles,
  scrapedContent,
  onSetScrapedContent,
  isButtonDisabled,
  onSubmit,
}: Props) => {
  const { data, setData } = useNewAssistantStore();
  const [siteUrl, setSiteUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [websiteMode, setWebsiteMode] = useState<"scrape" | "crawl">("scrape");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newTotalCount =
      selectedFiles.reduce((total, file) => total + file.characterCount, 0) +
      data.dataFields.reduce(
        (total, field) => total + field.pageContent.length,
        0
      );
    onUpdateCharacterCount(newTotalCount);
  }, [selectedFiles, data.dataFields, onUpdateCharacterCount]);

  const addDataField = (index: number) => {
    setData({
      dataFields: [
        ...data.dataFields,
        {
          pageContent: "",
          metadata: { title: "", description: "", id: index + 1 },
        },
      ],
    });
  };

  const removeDataField = (index: number) => {
    if (data.dataFields.length > 1) {
      const newDataFields = data.dataFields.filter((_, i) => i !== index);
      setData({ dataFields: newDataFields });
    }
  };

  const updateDataField = (
    index: number,
    field: "pageContent" | "title" | "description",
    value: string
  ) => {
    const newDataFields = [...data.dataFields];
    if (field === "pageContent") {
      newDataFields[index].pageContent = value;
    } else {
      newDataFields[index].metadata[field] = value;
    }
    setData({ dataFields: newDataFields });
  };

  const handleWebsiteAction = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/crawl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: siteUrl, mode: websiteMode }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch website data");
      }

      onSetScrapedContent((prev: Document[]) => [...prev, ...result.docs]);
    } catch (error) {
      console.error(
        `Error ${websiteMode === "scrape" ? "scraping" : "crawling"} site:`,
        error
      );
      setError(
        `Failed to ${
          websiteMode === "scrape" ? "scrape" : "crawl"
        } the website. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newSelectedFiles: SelectedFile[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const text = await file.text();
        newSelectedFiles.push({
          file,
          characterCount: text.length,
        });
      }
      onSetSelectedFiles([...selectedFiles, ...newSelectedFiles]);
    }
  };

  const removeSelectedFile = (index: number) => {
    onSetSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Training Data</CardTitle>
          <CardDescription>
            Add data fields to train your assistant, gather website data, or
            upload a file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="manual">Manual Input</TabsTrigger>
              <TabsTrigger value="website">Website Data</TabsTrigger>
              <TabsTrigger value="file">File Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="manual">
              {data.dataFields.map((field, index) => {
                return (
                  <div key={index}>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Data Field {index + 1}
                        </CardTitle>
                        {data.dataFields.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDataField(index)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove data field</span>
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`title-${index}`}>Title</Label>
                            <Input
                              id={`title-${index}`}
                              value={field.metadata.title}
                              onChange={(e) =>
                                updateDataField(index, "title", e.target.value)
                              }
                              placeholder="Enter data field title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`description-${index}`}>
                              Description
                            </Label>
                            <Input
                              id={`description-${index}`}
                              value={field.metadata.description}
                              onChange={(e) =>
                                updateDataField(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Enter data field description"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`pageContent-${index}`}>
                            Page Content
                          </Label>
                          <Textarea
                            id={`pageContent-${index}`}
                            value={field.pageContent}
                            onChange={(e) =>
                              updateDataField(
                                index,
                                "pageContent",
                                e.target.value
                              )
                            }
                            placeholder="Enter training data"
                          />
                        </div>
                      </CardContent>
                    </Card>
                    {index == data.dataFields.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => addDataField(index)}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Data Field
                      </Button>
                    )}
                  </div>
                );
              })}
            </TabsContent>
            <TabsContent value="website">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Website Data Mode</Label>
                  <RadioGroup
                    value={websiteMode}
                    onValueChange={(value) =>
                      setWebsiteMode(value as "scrape" | "crawl")
                    }
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scrape" id="scrape" />
                      <Label htmlFor="scrape">Scrape Single Page</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="crawl" id="crawl" />
                      <Label htmlFor="crawl">
                        Crawl Entire Website (All Accessible Subpages)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Website URL</Label>
                  <Input
                    id="siteUrl"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleWebsiteAction}
                  disabled={isLoading || !siteUrl}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : websiteMode === "scrape" ? (
                    <Scissors className="mr-2 h-4 w-4" />
                  ) : (
                    <Globe className="mr-2 h-4 w-4" />
                  )}
                  {isLoading
                    ? websiteMode === "scrape"
                      ? "Scraping..."
                      : "Crawling..."
                    : websiteMode === "scrape"
                    ? "Scrape Page"
                    : "Crawl Website"}
                </Button>
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {scrapedContent.length > 0 && (
                  <div className="space-y-2">
                    <Label>Scraped Content</Label>
                    <ScrollArea className="h-max w-full rounded-md border p-4">
                      {scrapedContent.map((doc, index) => (
                        <div
                          key={index}
                          className="mb-4 pb-4 border-b last:border-b-0"
                        >
                          <h3 className="text-lg font-semibold">
                            {doc.metadata.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {doc.metadata.url}
                          </p>
                          <p className="text-sm mb-2">
                            {doc.metadata.description}
                          </p>
                          <details>
                            <summary className="cursor-pointer text-sm font-medium">
                              View Content
                            </summary>
                            <pre className="mt-2 whitespace-pre-wrap text-sm">
                              {doc.pageContent}
                            </pre>
                          </details>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="file">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload Files</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".txt,.pdf,.doc,.docx"
                    multiple
                  />
                </div>
                <SelectedFilesList
                  files={selectedFiles}
                  uploaded={false}
                  onRemove={removeSelectedFile}
                />

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <div className="flex justify-between items-center p-6 border-t">
          <Button
            type="button"
            onClick={onPrevStep}
            variant="outline"
            className="h-10 px-4 py-2 w-[110px]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <KindOtterButton
            text="Create Assistant"
            disabled={isButtonDisabled}
            onClick={onSubmit}
            className="h-10 px-4 py-2 w-[140px]"
          />
        </div>
      </Card>
    </>
  );
};

export default Step3;
