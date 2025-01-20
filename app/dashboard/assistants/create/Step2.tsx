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

const Step2 = () => {
  const { data, setData } = useNewAssistantStore();
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
                defaultValue="https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar3.jpg"
                onValueChange={(value) => setData({ avatarUrl: value })}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select avatar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar1.jpg">
                    Avatar 1
                  </SelectItem>
                  <SelectItem value="https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar2.jpg">
                    Avatar 2
                  </SelectItem>
                  <SelectItem value="https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar3.jpg">
                    Avatar 3
                  </SelectItem>
                </SelectContent>
              </Select>
              <CldUploadWidget
                uploadPreset="ml_default"
                onSuccess={(result) => {
                  console.log(result);
                  if (result.info && typeof result.info !== "string") {
                    console.log(data);
                    const url = getCldImageUrl({
                      src: result.info.public_id,
                    });
                    setData({
                      avatarUrl: url,
                    });
                  }
                }}
              >
                {({ open }) => {
                  return <Button onClick={() => open()}>Upload Avatar</Button>;
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
