import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../../../database/db";
import ScheduleSong from "./schedule-song.model";

export default class Schedule extends Model<
  InferAttributes<Schedule>,
  InferCreationAttributes<Schedule>
> {
  declare id: CreationOptional<string>;
  declare date: Date;
  declare songs?: ScheduleSong[];
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Schedule.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: database,
    modelName: "Schedule",
  }
);

Schedule.hasMany(ScheduleSong, {
  as: "songs",
  foreignKey: {
    allowNull: false,
    name: "scheduleId",
  },
  onDelete: "cascade",
});
