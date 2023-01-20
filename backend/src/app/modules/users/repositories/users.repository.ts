import User from "../models/user.model";

export default class UsersDAO {
  public async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  public async findById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: {
        email,
      },
    });
  }

  public async save(user: any): Promise<User> {
    return await User.create(user);
  }

  public async update(id: string, user: any): Promise<User | null> {
    await User.update(user, {
      where: { id },
    });

    return await User.findByPk(id);
  }

  public async delete(id: string): Promise<void> {
    await User.destroy({
      where: { id },
    });
  }
}
