//@ts-nocheck
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
    try {
        const id = params.id;

        const applications = await prismaclient.application.findMany({
            where: {
                job_id: id
            },
            include : {
                user : true 
            }
        })

        if(!applications){
            return NextResponse.json({
                success : false ,
                message : "No Applicants"
            })
        }

        return NextResponse.json({
            success : true ,
            applications : applications 
        })

    } catch (err) {
        return NextResponse.json({
            success: false,
            message: err.message
        })
    }
}