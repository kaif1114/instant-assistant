import { Bot, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardHeader } from "../components/DashboardHeader";
import AssistantsList from "./AssistantsList";

export default async function Page() {
  

  return (
    <div className="flex  flex-col">
      <DashboardHeader />
      
      <div className="flex-1">
        {/* Main Content */}
        <div className="flex flex-col gap-6 p-6">
          {/* Header Section */}
          <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 sm:items-center justify-between ">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-black">Assistants Overview</h1>
              <p className="text-sm text-muted-foreground">
                Manage and monitor your AI chatbots
              </p>
            </div>
            <div className="flex items-center gap-4">
              
              
              <Button className="w-full sm:w-auto" asChild>
                <Link href="assistants/create" className="flex items-center justify-center">
                  <Plus className="mr-2 h-4 w-4" /> Create New Assistant
                </Link>
              </Button>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg border">
            <AssistantsList />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-auto pt-4">
            <Button variant="outline" className="w-full sm:w-auto">
              Export Data
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Bot className="mr-2 h-4 w-4" /> Test Assistants
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
