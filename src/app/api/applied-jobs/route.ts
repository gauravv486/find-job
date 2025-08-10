import getCurrentUser from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const user = await getCurrentUser();
        const applications = await prismaclient.application.findMany({
            where: {
                user_id: user.id
            },
            include: {
                job: true
            }
        })
        return NextResponse.json({
            success : true ,
            data : applications
        })

    } catch (err : any) {
        return NextResponse.json({
            success : false ,
            message : err.message
        })
    }
}