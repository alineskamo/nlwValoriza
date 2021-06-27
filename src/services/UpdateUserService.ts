import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUserRequest {
    user_id: string,
    name: string,
    email: string,
    password: string
}

class UpdateUserService {
    async execute({user_id, name, email, password} : IUserRequest){

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(user_id);

        if(!user){
            throw new Error("Invalid User")
        }

        const passwordHash = await hash(password, 8);

        usersRepository.update(user_id, {name: name, email: email, password: passwordHash, updated_at: new Date()});

        const newUser = await usersRepository.findOne(user_id);
      
        return newUser;
    }

}

export {UpdateUserService}