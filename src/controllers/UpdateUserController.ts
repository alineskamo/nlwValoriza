import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";


class UpdateUserController {
    async handle(request:Request, response:Response){

        const {name, email, password} = request.body;
        const {user_id} = request;

        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({user_id, name, email, password});

        return response.json(user);
    }

}

export {UpdateUserController}