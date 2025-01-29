"use client";

import { motion } from "framer-motion";
import { ChevronRight, Filter, Search } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAssistants } from "@/hooks/useAssistants";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useSelectedAssistantStore } from "./store";

export function AssistantList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const router = useRouter();

  const { setSelectedAssistant } = useSelectedAssistantStore();
  const { user } = useUser();

  const { data: assistants, isError, error, isLoading } = useAssistants(
    user ? user.id : undefined
  );

  const filteredAssistants = assistants?.filter((assistant) => {
    const matchesSearch =
      assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || assistant.Type === filterType;
    return matchesSearch && matchesFilter;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">Please sign in to view assistants</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search assistants..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssistants?.map((assistant, index) => (
            <motion.div
              key={assistant.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => {
                  setSelectedAssistant(assistant)
                  router.push(`/dashboard/assistants/preview/${assistant.name}`)
                }}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage
                      src={assistant.avatarUrl}
                      alt={assistant.name}
                    />
                    <AvatarFallback>{assistant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-xl">{assistant.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          assistant.Status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {assistant.Status}
                      </Badge>
                      <Badge variant="outline">{assistant.Type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {assistant.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => {
                      setSelectedAssistant(assistant);
                    }}
                  >
                    Preview
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredAssistants?.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl font-semibold text-gray-600">
              No assistants found
            </p>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}