import { Request, Response } from "express";
import { SearchTagByNameService } from "../services/SearchTagByNameService";

class SearchTagByNameController {
    async handle(request: Request, response: Response) {
        const {name} = request.params;

        const searchtagByNameService = new SearchTagByNameService();

        const tag = await searchtagByNameService.execute(name);

        response.json(tag);
    }

}

export {SearchTagByNameController}