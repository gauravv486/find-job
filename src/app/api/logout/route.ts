import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
   
    const response = NextResponse.json({ success: true, message: "Token deleted" });
    response.cookies.delete("token");

    return response;
}
