import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

export async function ensureAdmin(request: Request, response: Response, nextFunction: NextFunction) {
    
    const {user_id} = request;

    const usersRepository = getCustomRepository(UsersRepository);

    const {admin} = await usersRepository.findOne(user_id);

    //verifica se o usuário é admin
    if(admin) {
        return nextFunction();
    }

    return response.status(401).json({ 
        error: "Unauthorized"
    });
}