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
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
  getCldImageUrl,
} from "next-cloudinary";
import { useState } from "react";
import { useNewAssistantStore } from "./store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const zodSchema = z.object({
  primaryColor: z
    .string()
    .regex(hexColorRegex, "Must be a valid hex color (e.g., #478ACD)")
    .min(1, "Primary color is required"),

  secondaryColor: z
    .string()
    .regex(hexColorRegex, "Must be a valid hex color (e.g., #0A0A15)")
    .min(1, "Secondary color is required"),

  startingMessage: z
    .string()
    .min(1, "Starting message is required")
    .max(200, "Starting message cannot exceed 200 characters"),

  avatarUrl: z.string().url("Must be a valid URL").min(1, "Avatar is required"),
});

type FormData = z.infer<typeof zodSchema>;

const Step2 = ({
  onNextStep,
  onPreviousStep,
}: {
  onNextStep: () => void;
  onPreviousStep: () => void;
}) => {
  const { data, setData } = useNewAssistantStore();
  const [avatars, setAvatars] = useState([
    {
      label: "Avatar 1",
      source:
        "https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar1.jpg",
    },
    {
      label: "Avatar 2",
      source:
        "https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar2.jpg",
    },
    {
      label: "Avatar 3",
      source:
        "https://res.cloudinary.com/dvr5vgvq0/image/upload/v1732721904/avatars/avatar3.jpg",
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      primaryColor: data.primaryColor || "#ffffff",
      secondaryColor: data.secondaryColor || "#0A0A15",
      startingMessage: data.startingMessage || "",
      avatarUrl: data.avatarUrl || "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how your assistant&apos;s chat interface looks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={handleSubmit((data) => {
            setData({ ...data });
            onNextStep();
          })}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                {...register("primaryColor")}
                className="w-12 h-12 p-1"
                onChange={(e) => {
                  setValue("primaryColor", e.target.value);
                  setData({ primaryColor: e.target.value });
                }}
              />
              <Input {...register("primaryColor")} placeholder="#478ACD" />
            </div>
            {errors.primaryColor && (
              <p className="text-red-600">{errors.primaryColor.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                {...register("secondaryColor")}
                onChange={(e) => {
                  setValue("secondaryColor", e.target.value);
                  setData({ secondaryColor: e.target.value });
                }}
                className="w-12 h-12 p-1"
              />
              <Input {...register("secondaryColor")} placeholder="#0A0A15" />
            </div>
            {errors.secondaryColor && (
              <p className="text-red-600">{errors.secondaryColor.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startingMessage">Starting Message</Label>
            <Input
              {...register("startingMessage")}
              placeholder="Enter starting message"
            />
            {errors.startingMessage && (
              <p className="text-red-600">{errors.startingMessage.message}</p>
            )}
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
                  onValueChange={(value) => setValue("avatarUrl", value)}
                  defaultValue={data.avatarUrl}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select avatar" />
                  </SelectTrigger>
                  <SelectContent>
                    {avatars.map((avatar, index) => (
                      <SelectItem
                        key={`${avatar.label}-${index}`}
                        value={avatar.source}
                      >
                        {avatar.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <CldUploadWidget
                  uploadPreset="ml_default"
                  options={{
                    sources: ["local", "url", "camera"],
                    multiple: false,
                    maxFiles: 1,
                    showAdvancedOptions: false,
                    cropping: true,
                    showSkipCropButton: false,
                    croppingAspectRatio: 1,
                    clientAllowedFormats: ["image"],
                    maxImageFileSize: 2000000,
                  }}
                  onSuccess={(result: CloudinaryUploadWidgetResults) => {
                    if (result.info && typeof result.info === "object") {
                      const url = getCldImageUrl({
                        src: result.info.public_id,
                      });
                      setAvatars((prev) => [
                        ...prev,
                        { label: "Custom Avatar", source: url },
                      ]);
                      setValue("avatarUrl", url);
                    }
                  }}
                >
                  {({ open }) => {
                    function handleOnClick(
                      e: React.MouseEvent<HTMLButtonElement>
                    ) {
                      e.stopPropagation();
                      e.preventDefault();
                      open();
                    }
                    return (
                      <Button onClick={handleOnClick}>Upload Avatar</Button>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>
            {errors.avatarUrl && (
              <p className="text-red-600">{errors.avatarUrl.message}</p>
            )}
          </div>
          <div className="flex justify-between items-center mt-6 space-x-4">
            <Button
              type="button"
              onClick={onPreviousStep}
              variant="outline"
              className="w-[110px]"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button type="submit" className="w-[110px]">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Step2;
