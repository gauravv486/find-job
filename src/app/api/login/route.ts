import { generateToken } from "@/services/jwt";
import prismaclient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const user = await prismaclient.user.findUnique({
            where: {
                email: body.email
            }
        })

        if(!user){
            return NextResponse.json({
                success : false ,
            })
        }

        const token = await generateToken(user.email);
        const cookiestore = await cookies();
        cookiestore.set('token' , token);

        return NextResponse.json({
            success : true ,
            data : user
        })

    } catch (error : any ) {
        return NextResponse.json({
            success : false ,
            message : error.message 
        })
    }

}