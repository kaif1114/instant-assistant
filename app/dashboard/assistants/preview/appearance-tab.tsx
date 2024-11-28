"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Assistants } from "@prisma/client";

export function AppearanceTab({ Assistant }: { Assistant: Assistants }) {
  const [data, setData] = useState(Assistant);

  const updateData = (update: Partial<typeof data>) => {
    setData((current) => ({ ...current, ...update }));
  };

  const handleSubmit = async () => {
    // TODO: Implement PATCH request to update assistant
    console.log("Updating assistant:", data);
  };

  return (
    <div className="space-y-6">
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
              onChange={(e) => updateData({ name: e.target.value })}
              placeholder="Enter assistant name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Assistant Description</Label>
            <Input
              id="description"
              value={data.description}
              onChange={(e) => updateData({ description: e.target.value })}
              placeholder="Short one-line description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assistantType">Assistant Type</Label>
            <RadioGroup
              value={data.Type}
              onValueChange={(value) => updateData({ Type: value })}
              className="flex flex-col space-y-1"
            >
              {["Support", "Sales", "Technical", "General", "Custom"].map(
                (type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type.toLowerCase()} />
                    <Label htmlFor={type.toLowerCase()}>{type}</Label>
                  </div>
                )
              )}
            </RadioGroup>
            {data.Type === "Custom" && (
              <Input
                value={data.Type}
                onChange={(e) => updateData({ Type: e.target.value })}
                placeholder="Enter custom assistant type"
                className="mt-2"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="functionality">Functionality</Label>
            <Textarea
              id="functionality"
              value={data.functionality}
              onChange={(e) => updateData({ functionality: e.target.value })}
              placeholder="Describe how the assistant should function"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how your assistant's chat interface looks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="primaryColor"
                type="color"
                value={data.primaryColor}
                onChange={(e) => updateData({ primaryColor: e.target.value })}
                className="w-12 h-12 p-1"
              />
              <Input
                value={data.primaryColor}
                onChange={(e) => updateData({ primaryColor: e.target.value })}
                placeholder="#478ACD"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="secondaryColor"
                type="color"
                value={data.secondaryColor}
                onChange={(e) => updateData({ secondaryColor: e.target.value })}
                className="w-12 h-12 p-1"
              />
              <Input
                value={data.secondaryColor}
                onChange={(e) => updateData({ secondaryColor: e.target.value })}
                placeholder="#0A0A15"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startingMessage">Starting Message</Label>
            <Input
              id="startingMessage"
              value={data.startingMessage}
              onChange={(e) => updateData({ startingMessage: e.target.value })}
              placeholder="Enter starting message"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar</Label>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={data.avatarUrl} alt="Assistant Avatar" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Select
                  defaultValue={data.avatarUrl}
                  onValueChange={(value) => updateData({ avatarUrl: value })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select avatar" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3].map((num) => (
                      <SelectItem
                        key={num}
                        value={`https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar${num}.jpg`}
                      >
                        Avatar {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button onClick={handleSubmit} className="mt-6">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
