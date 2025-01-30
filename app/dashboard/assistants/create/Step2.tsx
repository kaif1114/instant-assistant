import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import { useNewAssistantStore } from "./store";
import { useState, useEffect } from "react";

const Step2 = () => {
  const { data, setData } = useNewAssistantStore();
  const [avatars, setAvatars] = useState([
    { label: "Avatar 1", source: "https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar1.jpg" },
    { label: "Avatar 2", source: "https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar2.jpg" },
    { label: "Avatar 3", source: "https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar3.jpg" }
  ]);

  useEffect(() => {
    console.log("Current avatars:", avatars);
    console.log("Current Avatar: ", data.avatarUrl)
  }, [avatars]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how your assistant&apos;s chat interface looks
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
              onChange={(e) => setData({ primaryColor: e.target.value })}
              className="w-12 h-12 p-1"
            />
            <Input
              value={data.primaryColor}
              onChange={(e) => setData({ primaryColor: e.target.value })}
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
              onChange={(e) => setData({ secondaryColor: e.target.value })}
              className="w-12 h-12 p-1"
            />
            <Input
              value={data.secondaryColor}
              onChange={(e) => setData({ secondaryColor: e.target.value })}
              placeholder="#0A0A15"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startingMessage">Starting Message</Label>
          <Input
            id="startingMessage"
            value={data.startingMessage}
            onChange={(e) => setData({ startingMessage: e.target.value })}
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
                value={data.avatarUrl}
                defaultValue="https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar3.jpg"
                onValueChange={(value) => setData({ avatarUrl: value })}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select avatar" />
                </SelectTrigger>
                <SelectContent>
                  {avatars.map((avatar, index) => (
                    <SelectItem key={`${avatar.label}-${index}`} value={avatar.source}>
                      {avatar.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CldUploadWidget
                uploadPreset="ml_default"
                options={{
                  sources: ['local', 'url', 'camera'],
                  multiple: false,
                  maxFiles: 1,
                  showAdvancedOptions: false,
                  cropping: true,
                  showSkipCropButton: false,
                  croppingAspectRatio: 1,
                  clientAllowedFormats: ['image'],
                  maxImageFileSize: 2000000,
                }}
                onSuccess={(result: any) => {
                  if (result.info && typeof result.info !== "string") {
                    const url = getCldImageUrl({
                      src: result.info.public_id,
                    });
                    setData({
                      avatarUrl: url,
                    });
                    setAvatars(prev => [...prev, { label: "Custom Avatar", source: url }])
                  }
                }}
              >
                {({ open }) => {
                  function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
                    e.stopPropagation();
                    e.preventDefault();
                    open();
                  }
                  return <Button onClick={handleOnClick}>Upload Avatar</Button>;
                }}
              </CldUploadWidget>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step2;
