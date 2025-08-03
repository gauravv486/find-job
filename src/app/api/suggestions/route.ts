import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){

    const searchparams = req.nextUrl.searchParams;
    const query  = searchparams.get('query') || "";

    const user = await prismaclient.job.findMany({
        where : {
            jobTitle : {
                contains : query,
                mode : 'insensitive'
            }
        },
        take : 10
    }) 

    if(!user){
        return NextResponse.json({
            success : false ,
            message : "NO JOB FOUND"
        })
    }
    return NextResponse.json({
        success : true ,
        user : user
    })
}       