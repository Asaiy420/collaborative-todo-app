import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";


interface JwtPayload {
    userId: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const protectRoute = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}