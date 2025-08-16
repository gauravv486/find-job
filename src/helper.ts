import { cookies } from "next/headers";
import { verifyToken } from "./services/jwt";
import prismaclient from "./services/prisma";

export default async function getCurrentUser() {

    try {
        const usercookie = await cookies();
        const token = usercookie.get('token')?.value;
        const user = await verifyToken(token) || "";

        const currUser = await prismaclient.user.findUnique({
            where: {
                email: user
            },
            include : {
                company : true
            }
        })
        return currUser;

    } catch (error: any) {
        return error.message;
    }
}