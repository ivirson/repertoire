import LogService from "../../../shared/log/services/log.service";
import { AppError } from "../../../shared/models/error.model";
import Song from "../models/song.model";
import SongsRepository from "../repositories/songs.repository";

const songsRepository = new SongsRepository();
const logService = new LogService();

export default class SongsService {
  public async findAll(): Promise<Song[]> {
    try {
      return await songsRepository.findAll();
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw new AppError("There was an error querying the data.", 500);
    }
  }

  public async findById(id: string): Promise<Song | null> {
    try {
      const song = await songsRepository.findById(id);
      if (!song) {
        throw new AppError("Song not found.");
      }
      return song;
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw error || new AppError("There was an error querying the data.", 500);
    }
  }

  public async findByArtist(artist: string): Promise<Song[] | null> {
    try {
      return await songsRepository.findByArtist(artist);
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw error || new AppError("There was an error querying the data.", 500);
    }
  }

  public async save(song: Song): Promise<Song> {
    try {
      return await songsRepository.save(song);
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw new AppError("There was an error saving the data.", 500);
    }
  }

  public async update(id: string, song: Song): Promise<Song | null> {
    try {
      const songExist = await songsRepository.findById(id);
      if (!songExist) {
        throw new AppError("Song not found.");
      }
      return await songsRepository.update(id, song);
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw error || new AppError("There was an error updating the data.", 500);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const song = await songsRepository.findById(id);
      if (!song) {
        throw new AppError("Song not found.");
      }
      await songsRepository.delete(id);
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw error || new AppError("There was an error deleting the data.", 500);
    }
  }
}
