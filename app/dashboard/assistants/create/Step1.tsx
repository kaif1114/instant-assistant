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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AssistantType } from "@/app/schemas";

const zodSchema = z.object({
  name: z
    .string()
    .min(1, "Assistant name is required")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description cannot exceed 300 characters"),
  Type: z.enum(["Support", "Sales", "Technical", "General", "Custom"], {
    required_error: "Please select an assistant type",
  }),
  customType: z.string().optional(),
  functionality: z
    .string()
    .min(10, "Functionality description must be at least 10 characters")
    .max(1000, "Functionality description cannot exceed 1000 characters"),
});

type FormData = z.infer<typeof zodSchema>;

const Step1 = ({
  onNextStep,
  isPrevButtonDisabled,
  onPreviousStep,
}: {
  onNextStep: () => void;
  onPreviousStep: () => void;
  isPrevButtonDisabled: boolean;
}) => {
  const { data, setData } = useNewAssistantStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(zodSchema),
    defaultValues: data,
  });
  const Type = watch("Type");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assistant Details</CardTitle>
        <CardDescription>
          Provide basic information about your assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={handleSubmit((data, e) => {
            e?.preventDefault();
            setData({ ...data });
            onNextStep();
          })}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Assistant Name</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Assistant Description</Label>
            <Input {...register("description")} />
            {errors.description && (
              <p className="text-red-600">{errors.description.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="assistantType">Assistant Type</Label>
            <RadioGroup
              defaultValue={data.Type}
              onValueChange={(value) => {
                const Type = value as AssistantType;
                register("Type").onChange({
                  target: { value: Type, name: "Type" },
                });
              }}
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
                <RadioGroupItem
                  onSelect={() => setValue("Type", "Custom")}
                  value="Custom"
                  id="custom"
                />
                <Label htmlFor="custom">Custom</Label>
              </div>
            </RadioGroup>
            {Type === "Custom" && (
              <Input
                {...register("customType")}
                required={true}
                onInvalid={() =>
                  setError("customType", { message: "Custom type is required" })
                }
                className="mt-2"
              />
            )}

            {errors.Type && (
              <p className="text-red-600">{errors.Type.message}</p>
            )}
            {errors.customType && (
              <p className="text-red-600">{errors.customType.message}</p>
            )}
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="functionality">Functionality</Label>
            <Textarea {...register("functionality")} />
            {errors.functionality && (
              <p className="text-red-600">{errors.functionality.message}</p>
            )}

          </div>
          <div className="flex justify-between items-center mt-6 space-x-4">
            <Button
              type="button"
              onClick={onPreviousStep}
              disabled={isPrevButtonDisabled}
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

export default Step1;
