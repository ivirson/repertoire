import bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Error } from "sequelize";
import { AppError } from "../../../shared/models/error.model";
import UsersRepository from "../../users/repositories/users.repository";
import AuthRepository from "../repositories/auth.repository";

const authRepository = new AuthRepository();
const usersRepository = new UsersRepository();

export default class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const user = await authRepository.findByEmail(email);

      if (!user) {
        return response.status(404).json(new AppError("User not found."));
      }

      if (!(await bcrypt.compare(password, user.dataValues.password))) {
        return response.status(401).json(new AppError("Incorrect password."));
      }

      const token = jwt.sign(
        {
          userId: user.dataValues.id,
          email,
        },
        process.env.TOKEN_KEY!
      );

      return response.status(200).json({
        user: {
          id: user.dataValues.id,
          name: user.dataValues.name,
          email: user.dataValues.email,
        },
        token,
      });
    } catch (error: Error | any) {
      return response
        .status(500)
        .json(
          new AppError(
            "There was an error querying the data.",
            error.errors.map((e: Error) => e.message) || error
          )
        );
    }
  }

  public async register(
    request: Request,
    response: Response
  ): Promise<Response> {
    const user = request.body;

    try {
      const createdUser = await usersRepository.save(user);
      return response.status(201).json(createdUser);
    } catch (error: Error | any) {
      return response
        .status(500)
        .json(
          new AppError(
            "There was an error saving the data.",
            error.errors.map((e: Error) => e.message) || error
          )
        );
    }
  }
}
