import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest , context : {params :  {id : string}}){
    const id = context.params.id ;

    try{
        const data = await prismaclient.job.findUnique({
            where : {
                jobId : id
            }
        })
        if(!data){
            return NextResponse.json({
                success : false ,
                message : "Job is currently not available"
            })
        }
        return NextResponse.json(data);

    }catch(error){
        return NextResponse.json({
            success : false 
        })
    }
}