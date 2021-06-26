import { getCustomRepository } from "typeorm"
import { TagsRepository } from "../repositories/TagsRepository"

class CreateTagService{
    async execute(name: string) {
        const tagsRepository = getCustomRepository(TagsRepository);

        //Regra para nome inválido
        if(!name) {
            throw new Error("Incorrect name");
        }

        //Regra de repetição de nome
        const tagAlreadyExists = await tagsRepository.findOne({ name });
        if(tagAlreadyExists){
            throw new Error("Tag already exists!");
        }

        //Caso tudo esteja correto, a tag é salva
        const tag = tagsRepository.create({ name });

        await tagsRepository.save(tag);

        return tag;   
    }
}

export { CreateTagService }