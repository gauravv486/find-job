import prismaclient from "@/services/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();

        if (!body.email || !body.password) {
            return NextResponse.json({
                success: false,
                error: "empty credentials"
            },
                {
                    status: 400
                }
            )
        }

        const user = await prismaclient.user.create({
            data: body
        })

        


        return NextResponse.json({
            success: true,
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}