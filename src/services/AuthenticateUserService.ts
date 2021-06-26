import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";


interface IAuthenticateRequest {
    email: string;
    password: string;
} 

class AuthenticationUserService {
    async execute({email, password}: IAuthenticateRequest){

        const usersRepository = getCustomRepository(UsersRepository);

        //Verificar se o email existe
        const user = await usersRepository.findOne({email});

        if(!user){
            throw new Error("Email/password incorrect");
        }
        
        //Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password); 

        if(!passwordMatch){
            throw new Error("Email/password incorrect");
        }

        //Gerar token
        const token = sign(
            {email: user.email}, 
            "f3743d9e9b8c4e58d45d1bc7fd4fa43c", 
            {subject: user.id, expiresIn: "1d"});

        return token;
    }

}

export { AuthenticationUserService }