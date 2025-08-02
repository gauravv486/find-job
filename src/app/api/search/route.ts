//@ts-nocheck
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get('query') || "";
        const jobtype = searchParams.get('jobtype') || "";
        
        const rawMin = searchParams.get('minprice');
        const parsedMin = rawMin ? parseInt(rawMin, 10) : 0;
        const minprice = isNaN(parsedMin) ? 0 : parsedMin;
        
        const jobdata = await prismaclient.job.findMany({
            where: {
                jobTitle: {
                    contains: query,
                    mode: "insensitive"
                },
                minSalary: {
                    gte: minprice
                },
                ...(jobtype && {
                    jobLocation : jobtype
                })
            }
        })

        return NextResponse.json({
            data: jobdata
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}