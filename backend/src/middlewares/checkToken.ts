import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Étendre l'interface Request pour inclure la propriété token
declare module "express-serve-static-core" {
    interface Request {
        token?: string;
        decodedToken?: JwtPayload | string;
    }
}

export interface DecodeToken {
    id: number;
    name: string;
    email: string;
    iat: number;
    exp: number;
}

export async function checkToken(req: Request, res: Response, next: NextFunction) {
    const fullToken = req.headers.authorization;

    if (!fullToken) {
        return res.status(401).json({ message: "No token provided" });
    }

    const [typeToken, token] = fullToken.split(" ");
    if (typeToken !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid token type or format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.token = token;
        req.decodedToken = decoded; // Stocker le token décodé si nécessaire
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}