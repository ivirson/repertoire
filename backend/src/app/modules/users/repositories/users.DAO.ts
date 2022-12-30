import User from "../models/user.model";

export default class UsersDAO {
  public async findAll(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await User.findOne({
      where: {
        id
      }
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
      where: {
        email
      }
    });
    return user;
  }
}