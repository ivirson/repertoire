import { Router } from "express";
import UsersController from "../controllers/users.controller";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.findAll);
usersRouter.get("/:id", usersController.findById);
usersRouter.post("/", usersController.save);
usersRouter.put("/:id", usersController.update);
usersRouter.delete("/:id", usersController.delete);

export default usersRouter;
