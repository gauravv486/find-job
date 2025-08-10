// @ts-nocheck
import getCurrentUser from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: User not found"
            }, { status: 401 });
        }

        const job = await prismaclient.job.findUnique({
            where: {
                id: id
            },
            include: {
                Company: {
                    include: {
                        user: true
                    }
                }
            }
        });

        if (!job) {
            return NextResponse.json({
                success: false,
                message: "Job not found"
            }, { status: 404 });
        }


        if ( job.Company.user.email !== user.email) {
            return NextResponse.json({
                success: false,
                message: "You can't delete someone else's job"
            }, { status: 403 });
        }

        await prismaclient.job.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Job Deleted"
        });

    } catch (err) {
        console.error("DELETE Job error:", err);
        return NextResponse.json({
            success: false,
            message: "Something went wrong on API route"
        }, { status: 500 });
    }
}
