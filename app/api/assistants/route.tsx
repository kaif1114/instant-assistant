import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    if (userId) {
        try {
            const assistants = await prisma.assistants.findMany({
                where: { userId: userId! },
            });

            return NextResponse.json(assistants, { status: 202 })

        } catch (error) {
            console.log(error)
            return NextResponse.json(error, { status: 500 })
        }
    }
    else {
        return NextResponse.json({ error: "userId not found" }, { status: 200 })
    }

}