import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Loading = () => {
    return (
        <div className="flex gap-6 h-[calc(100vh-200px)]">
            <Card className="w-60 flex-shrink-0">
                <CardContent className="p-4">
                    <div className="space-y-2 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-10 bg-gray-200 rounded-lg w-full"
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
                            <div className="h-9 bg-gray-200 rounded w-24 animate-pulse" />
                        </div>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-24 bg-gray-200 rounded-lg w-full animate-pulse"
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="w-60 flex-shrink-0 space-y-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                            <div className="h-2 bg-gray-200 rounded w-full animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                        </div>
                    </CardContent>
                </Card>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
            </div>
        </div>
    )
}

export default Loading
