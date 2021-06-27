import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";

class SearchTagByNameService {
    async execute(name: string) {

        const tagsRepository = getCustomRepository(TagsRepository);

        const tag = tagsRepository.findOne({ name });

        return tag;

    }

}

export { SearchTagByNameService }