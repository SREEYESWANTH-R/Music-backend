import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";



export interface AuthRequest extends Request {
    user? : {
        id : number;
    }
}

export const authenticate = (req : AuthRequest, res : Response, next : NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET as any);
        req.user = decoded as { id: number };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
} 