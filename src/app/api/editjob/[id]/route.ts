import getCurrentUser from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: any }) {
  try {
    const body = await req.json();
    const id = await params.id;

    const user = await getCurrentUser();

    const existingJob = await prismaclient.job.findUnique({
      where: { id : id},
      include: {
        Company: {
          include: {
            user: true,
          }
        }
      }
    });

    if (user.email !== existingJob?.Company?.user?.email) {
      return NextResponse.json({
        success: false,
        message: "You can't edit someone else's job",
      }, { status: 403 });
    }


    const updatedJob = await prismaclient.job.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      success: true,
      updatedJob,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error while updating job",
    }, { status: 500 });
  }
}
