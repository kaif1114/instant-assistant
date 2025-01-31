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
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const zodSchema = z.object({
  name: z.string()
    .min(1, "Assistant name is required")
    .max(50, "Name cannot exceed 50 characters"),
  description: z.string()
    .min(1, "Description is required")
    .max(100, "Description cannot exceed 100 characters"),
  assistantType: z.enum(["Support", "Sales", "Technical", "General", "Custom"], {
    required_error: "Please select an assistant type",
  }),
  customType: z.string().optional(),
  functionality: z.string()
    .min(10, "Functionality description must be at least 10 characters")
    .max(500, "Functionality description cannot exceed 500 characters"),
});

type FormData = z.infer<typeof zodSchema>;



const Step1 = ({ onNextStep }: { onNextStep: () => void }) => {
  const { data, setData } = useNewAssistantStore();
  const { register, handleSubmit, formState: { errors }, setValue, watch, setError } = useForm<FormData>({ resolver: zodResolver(zodSchema), defaultValues: data })
  const assistantType = watch("assistantType")
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assistant Details</CardTitle>
        <CardDescription>
          Provide basic information about your assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit((data, e) => {
          e?.preventDefault()
          setData({ ...data })
          onNextStep();
        })}>
          <div className="space-y-2">
            <Label htmlFor="name">Assistant Name</Label>
            <Input
              {...register("name")}

            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Assistant Description</Label>
            <Input
              {...register("description")}

            />
            {errors.description && <p className="text-red-600">{errors.description.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="assistantType">Assistant Type</Label>
            <RadioGroup
              defaultValue={data.assistantType}
              onValueChange={(value) => {
                const assistantType = value as AssistantType;
                register("assistantType").onChange({
                  target: { value: assistantType, name: "assistantType" }
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
                <RadioGroupItem onSelect={(e) => setValue("assistantType", "Custom")} value="Custom" id="custom" />
                <Label htmlFor="custom">Custom</Label>
              </div>
            </RadioGroup>
            {assistantType === "Custom" && <Input
              {...register("customType")}
              required={true}
              onInvalid={() => setError("customType", { message: "Custom type is required" })}
              className="mt-2"

            />}



            {errors.assistantType && <p className="text-red-600">{errors.assistantType.message}</p>}
            {errors.customType && <p className="text-red-600">{errors.customType.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="functionality">Functionality</Label>
            <Textarea
              {...register("functionality")}

            />
            {errors.functionality && <p className="text-red-600">{errors.functionality.message}</p>}
          </div>
          <Button type="submit" >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Step1;
