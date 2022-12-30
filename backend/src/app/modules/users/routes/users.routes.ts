import { Router } from "express";
import UsersController from "../controllers/users.controller";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.findAll);
usersRouter.get('/:id', usersController.findById);

export default usersRouter;
