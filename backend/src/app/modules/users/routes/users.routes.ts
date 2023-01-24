import { Router } from "express";
import verifyToken from "../../../middlewares/verify-token";
import UsersController from "../controllers/users.controller";

const usersRouter = Router();
const usersController = new UsersController();

/**
 * @swagger
 * /usuario:
 *  get:
 *      tags:
 *          - Usuario
 *      description: Get usuario
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Returns all users
 *              schema:
 *                  $ref: '#/components/schemas/Usuario'
 */
usersRouter.get("/", verifyToken, usersController.findAll);

/**
 * @swagger
 * /usuario/{:id}:
 *  get:
 *      tags:
 *          - Usuario
 *      description: Get usuario by id
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *      responses:
 *          200:
 *              description: Returns one user
 *              schema:
 *                  $ref: '#/components/schemas/Usuario'
 *          404:
 *              description: user not found
 */
usersRouter.get("/:id", verifyToken, usersController.findById);
usersRouter.post("/", verifyToken, usersController.save);
usersRouter.put("/:id", verifyToken, usersController.update);
usersRouter.delete("/:id", verifyToken, usersController.delete);

export default usersRouter;
