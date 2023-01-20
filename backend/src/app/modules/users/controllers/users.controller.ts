import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Error } from "sequelize";
import { AppError } from "../../../shared/models/error.model";
import UsersDAO from "../repositories/users.repository";

const usersDAO = new UsersDAO();

export default class UsersController {
  public async findAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const users = await usersDAO.findAll();
      return response.status(200).json(users);
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

  public async findById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    try {
      const user = await usersDAO.findById(id);

      if (user) {
        return response.status(200).json(user);
      }

      return response.status(404).json(new AppError("User not found."));
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

  public async findByEmail(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    try {
      const user = await usersDAO.findByEmail(email);

      if (user) {
        return response.status(200).json(user);
      }

      return response.status(404).json(new AppError("User not found."));
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

  public async save(request: Request, response: Response): Promise<Response> {
    const user = request.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(user.password, salt);
      const createdUser = await usersDAO.save({
        ...user,
        password: encryptedPassword,
      });
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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = request.body;

    try {
      const updatedUser = await usersDAO.update(id, user);
      return response.status(200).json(updatedUser);
    } catch (error: Error | any) {
      return response
        .status(500)
        .json(
          new AppError(
            "There was an error updating the data.",
            error.errors.map((e: Error) => e.message) || error
          )
        );
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      await usersDAO.delete(id);
      return response.status(200).json();
    } catch (error: Error | any) {
      return response
        .status(500)
        .json(
          new AppError(
            "There was an error removing the data.",
            error.errors.map((e: Error) => e.message) || error
          )
        );
    }
  }
}
