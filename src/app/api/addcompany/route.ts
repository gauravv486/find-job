import getCurrentUser from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const user = await getCurrentUser();

        const body = await req.json();

        const formattedbody = {
            ...body,
            ownerId: user.id
        }

        const company = await prismaclient.company.create({
            data: formattedbody
        })
        return NextResponse.json({
            success: true,
            company: company
        })
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message
        })
    }

}