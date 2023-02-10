import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../../../database/db";
import ScheduleSong from "../../schedule/models/schedule-song.model";

export default class Song extends Model<
  InferAttributes<Song>,
  InferCreationAttributes<Song>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare artist: string;
  declare tone?: string;
  declare lyricsLink?: string;
  declare chordsLink?: string;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Song.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lyricsLink: DataTypes.STRING,
    chordsLink: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: database,
    modelName: "Song",
  }
);
