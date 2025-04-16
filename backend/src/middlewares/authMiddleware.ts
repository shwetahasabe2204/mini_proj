import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { prisma } from '../config/dbconfig';


interface JwtPayload {
    id: number; 
}

export const authenticateJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
             res.status(401).send({success: false, error: "No token exists", message: "No token exists"});
             return;
        }
        
        const { id } = jwt.verify(token, process.env.JWTPRIVATEKEY as string) as JwtPayload;
        
        const user = await prisma.admin.findUnique({ where: { id } });
        if (!user) {
             res.status(401).send({success: false, error: "Admin not found", message: "Authentication failed"});
             return;
        }

        req.headers.id = id.toString();
        next();
    } catch (err) {
        console.log(err);
         res.status(401).send({success: false, error: err, message: "Authentication failed"});
    }
};