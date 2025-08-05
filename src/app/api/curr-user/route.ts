//@ts-nocheck
import { generateToken, verifyToken } from "@/services/jwt";
import prismaclient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const usercookie = await cookies();
        const token = usercookie.get('token')?.value;
        const user = await verifyToken(token) || "";

        const currUser = await prismaclient.user.findUnique({
            where: {
                email: user
            },
            include : {
                company : true
            }
        })
        
        return NextResponse.json({
            success: true,
            user: currUser
        })
        
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}