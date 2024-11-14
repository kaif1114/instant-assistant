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
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";
import { useNewAssistantStore } from "./store";

const Step3 = () => {
  const { data, setData } = useNewAssistantStore();

  const addDataField = () => {
    setData({
      ...data,
      dataFields: [
        ...data.dataFields,
        { pageContent: "", metadata: { title: "", description: "" } },
      ],
    });
  };

  const removeDataField = (index: number) => {
    const newDataFields = data.dataFields.filter((_, i) => i !== index);
    setData({ ...data, dataFields: newDataFields });
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
    setData({ ...data, dataFields: newDataFields });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Data</CardTitle>
        <CardDescription>
          Add data fields to train your assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.dataFields.map((field, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Data Field {index + 1}
              </CardTitle>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDataField(index)}
                >
                  <X className="h-4 w-4" />
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
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Input
                    id={`description-${index}`}
                    value={field.metadata.description}
                    onChange={(e) =>
                      updateDataField(index, "description", e.target.value)
                    }
                    placeholder="Enter data field description"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`pageContent-${index}`}>Page Content</Label>
                <Textarea
                  id={`pageContent-${index}`}
                  value={field.pageContent}
                  onChange={(e) =>
                    updateDataField(index, "pageContent", e.target.value)
                  }
                  placeholder="Enter training data"
                />
              </div>
            </CardContent>
          </Card>
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addDataField}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Data Field
        </Button>
      </CardContent>
    </Card>
  );
};

export default Step3;
