//@ts-nocheck
import getCurrentUser from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
    try {

        const user = await getCurrentUser();
        const jobid = params.id;

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "user is not authenticated"
            })
        }

        const appToSave = {
            user_id: user?.id,
            job_id: jobid
        }

        const applications = await prismaclient.application.create({
            data: appToSave
        })

        return NextResponse.json({
            success: true,
            data: applications
        })

    } catch (err) {
        return NextResponse.json({
            success: false,
            message: err.message
        })
    }

}