import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, nextFunction: NextFunction) {
    
    //receber o token
    const authtoken = request.headers.authorization;

    //validar se o token está preenchido
    if(!authtoken){
        return response.status(401).json({message: "Token missing"});
    }

    //verificar se o token é válido
    const[, token] = authtoken.split(" ");

    try{
        const {sub} = verify(token, "f3743d9e9b8c4e58d45d1bc7fd4fa43c") as IPayload;
        request.user_id = sub;
        return nextFunction();
        
    } catch(err){
        return response.status(401).end();
    }

    //recuperar dados do usuário

}