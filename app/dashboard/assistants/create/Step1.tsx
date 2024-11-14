import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNewAssistantStore } from "./store";
import { AssistantType } from "./AssistantTraining";

const Step1 = () => {
  const { data, setData } = useNewAssistantStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assistant Details</CardTitle>
        <CardDescription>
          Provide basic information about your assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Assistant Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Enter assistant name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Assistant Description</Label>
          <Input
            id="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Short one-line description"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="assistantType">Assistant Type</Label>
          <RadioGroup
            value={data.assistantType}
            onValueChange={(value) =>
              setData({ ...data, assistantType: value as AssistantType })
            }
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Support" id="support" />
              <Label htmlFor="support">Support</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Sales" id="sales" />
              <Label htmlFor="sales">Sales</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Technical" id="technical" />
              <Label htmlFor="technical">Technical</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="General" id="general" />
              <Label htmlFor="general">General</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Custom" id="custom" />
              <Label htmlFor="custom">Custom</Label>
            </div>
          </RadioGroup>
          {data.assistantType === "Custom" && (
            <Input
              value={data.customType}
              onChange={(e) => setData({ ...data, customType: e.target.value })}
              placeholder="Enter custom assistant type"
              className="mt-2"
              required={data.assistantType === "Custom"}
            />
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="functionality">Functionality</Label>
          <Textarea
            id="functionality"
            value={data.functionality}
            onChange={(e) =>
              setData({ ...data, functionality: e.target.value })
            }
            placeholder="Describe how the assistant should function"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Step1;
