import { NextFunction, Request, Response } from "express";

export function ensureAdmin(request: Request, response: Response, nextFunction: NextFunction) {
    
    //verificar usuário admin
    const admin = false;

    if(admin) {
        return nextFunction();
    }

    return response.status(401).json({ 
        error: "Unauthorized"
    });
}