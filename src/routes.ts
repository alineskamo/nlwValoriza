import { Router } from "express";
import { CreateTagController } from "./database/controllers/CreateTagController";
import { CreateUserController } from "./database/controllers/CreateUserController";
import { ensureAdmin } from "./database/middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAdmin, createTagController.handle);

export { router }