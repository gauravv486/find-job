// @ts-nocheck
import getCurrentUser from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;


  try {
    const user = await getCurrentUser();
    const job = await prismaclient.job.findUnique({
      where: { id },
      include: {
        Company: {
          include: { user: true },
        },
      },
    });

    if (!job) {
      return NextResponse.json({
        success: false,
        message: "Job not found",
      });
    }

    return NextResponse.json({
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job details:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
