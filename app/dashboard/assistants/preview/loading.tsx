import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Loading() {
    // Create an array of 6 items for skeleton cards
    const skeletonCards = Array(3).fill(null);

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <div className="space-y-6">
                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            disabled
                            type="text"
                            placeholder="Search assistants..."
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="text-gray-400" />
                        <Select disabled>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                        </Select>
                    </div>
                </div>

                {/* Grid of Skeleton Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {skeletonCards.map((_, index) => (
                        <Card key={index} className="cursor-pointer">
                            <CardHeader className="flex flex-row items-center gap-4">
                                {/* Avatar Skeleton */}
                                <div className="h-14 w-14 rounded-full bg-gray-200 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    {/* Title Skeleton */}
                                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                                    {/* Badges Skeleton */}
                                    <div className="flex gap-2">
                                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Description Skeleton */}
                                <div className="space-y-2 mb-4">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                                </div>
                                {/* Button Skeleton */}
                                <div className="h-9 bg-gray-200 rounded animate-pulse w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
