import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../../../database/db";
import Song from "../../songs/models/song.model";

export default class ScheduleSong extends Model<
  InferAttributes<ScheduleSong>,
  InferCreationAttributes<ScheduleSong>
> {
  declare id: CreationOptional<string>;
  declare scheduleId: string;
  declare songId: string;
  declare song?: Song;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

ScheduleSong.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    scheduleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    songId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: database,
    modelName: "ScheduleSong",
  }
);
