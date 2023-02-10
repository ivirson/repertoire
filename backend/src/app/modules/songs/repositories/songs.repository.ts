import Sequelize from "sequelize";
import Song from "../models/song.model";

export default class SongsRepository {
  public async findAll(): Promise<Song[]> {
    try {
      return await Song.findAll();
    } catch (error) {
      throw error;
    }
  }

  public async findByArtist(artist: string): Promise<Song[]> {
    try {
      const op = Sequelize.Op;
      return await Song.findAll({
        where: {
          artist: {
            [op.like]: `%${artist}%`,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<Song | null> {
    try {
      return await Song.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  public async save(song: any): Promise<Song> {
    try {
      return await Song.create(song);
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, song: Song): Promise<Song | null> {
    try {
      await Song.update(song, {
        where: { id },
      });

      return await Song.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await Song.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
