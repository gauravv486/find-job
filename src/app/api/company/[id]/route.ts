// @ts-nocheck
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  try {
    const id = params.id;

    const company = await prismaclient.company.findUnique({
      where: {
        id: id,
      },
      include: {
        job: true,
        review: true
      },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: company,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
