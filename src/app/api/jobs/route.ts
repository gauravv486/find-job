import { jobdata } from "@/jobData/jobdata";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const data = await prismaclient.job.findMany();
        return NextResponse.json({
            success : true ,
            data : data
        })

    } catch (err : any) {
        return NextResponse.json({
            success : false , 
            error : err.message
        })
    }
}