//@ts-nocheck
import jwt from 'jsonwebtoken';

export async function generateToken(data: any) {
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return token;
}

export async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("JWT verification failed:", error);
    }
}