
import getCurrentUser from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try 
    {
        const data = await prismaclient.job.findMany({
            include : {
                Company : {
                    include : {
                        user : true
                    }
                }
            }
        });
        return NextResponse.json({
            success: true,
            data: data
        })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            error: err.message
        })
    }
}

export async function POST(req: NextRequest) {

    try {      
        const body = await req.json();

        const formattedBody = {
            ...body,
            minSalary: parseInt(body.minSalary),
            
        }

        const job = await prismaclient.job.create({
            data: formattedBody
        })
        return NextResponse.json({
            success: true,
            data: job
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}