import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";


class ListUserReceiveComplimentsService {
    async execute(user_id: string){

        const complimentsRepository = getCustomRepository(ComplimentsRepository);

        const complimentsReceiver = complimentsRepository.find({
            where: {user_receiver: user_id},
            relations: ["userSender", "userReceiver", "tag"]
        });

        return complimentsReceiver;

    }
}

export {ListUserReceiveComplimentsService}