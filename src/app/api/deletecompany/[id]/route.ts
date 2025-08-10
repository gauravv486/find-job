import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {

    try {
        const deletedcompany = await prismaclient.company.delete({
            where: { id: params.id },
            
            include: {
                job:{
                    include : {
                        Application : true
                    }
                }
            },
        });
        console.log(deletedcompany);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to delete company",
                success: false
            },
            { status: 500 }
        );
    }
}
