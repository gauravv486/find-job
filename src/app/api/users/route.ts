import prismaclient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const userRole = "user";
        const users = await prismaclient.user.findMany({
            where: {
                role: userRole
            }
        })
        return NextResponse.json({
            success : true ,
            users : users
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false ,
            message : error.message
        })
    }
}