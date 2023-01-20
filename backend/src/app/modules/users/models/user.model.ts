import database from "./../../../database/db";
import Sequelize, { Model } from "sequelize";

export default class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: "User",
  }
);

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  delete values.password;
  delete values.createdAt;
  delete values.updatedAt;
  return values;
};
