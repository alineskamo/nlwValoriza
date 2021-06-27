import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { SearchTagByNameController } from "./controllers/SearchTagByNameController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();
const searchTagByNameController = new SearchTagByNameController();
const updateUserController = new UpdateUserController();

router.post("/login", authenticateUserController.handle);

router.post("/users", createUserController.handle);
router.get("/users", listUsersController.handle);
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentController.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle)
router.put("/users/update", ensureAuthenticated, updateUserController.handle)

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.get("/tags/:name", ensureAuthenticated, searchTagByNameController.handle);

router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

export { router }