import getCurrentUser from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const user = await getCurrentUser();

        const company = user.company ;
        
        const res = await prismaclient.job.findMany({
            where: {
                companyId: company.id,
            },
        });

        return NextResponse.json({
            success: true,
            jobs: res,
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || "Something went wrong",
        }, { status: 500 });
    }
}
