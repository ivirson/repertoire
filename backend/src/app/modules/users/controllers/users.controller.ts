import { Request, Response } from "express";
import UsersDAO from "../repositories/users.DAO";

const usersDAO = new UsersDAO();

export default class UsersController {
  public async findAll(request: Request, response: Response): Promise<Response> {
    const users = await usersDAO.findAll();
    return response.json(users);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = await usersDAO.findById(id);
    return response.json(user);
  }

  public async findByEmail(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const user = await usersDAO.findByEmail(email);
    return response.json(user);
  }
}