import LogService from "../../../shared/log/services/log.service";
import { AppError } from "../../../shared/models/error.model";
import Song from "../../songs/models/song.model";
import SongsRepository from "../../songs/repositories/songs.repository";
import Schedule from "../models/schedule.model";
import ScheduleSongsRepository from "../repositories/schedule-songs.repository";
import SchedulesRepository from "../repositories/schedule.repository";

const schedulesRepository = new SchedulesRepository();
const scheduleSongsRepository = new ScheduleSongsRepository();
const songsRepository = new SongsRepository();
const logService = new LogService();

export default class SchedulesService {
  public async findAll(): Promise<Schedule[]> {
    try {
      const schedules = await schedulesRepository.findAll();
      schedules.map(async (schedule) => {
        console.log("schedules.map");
        schedule.songs?.map(async (scheduleSong, index) => {
          const song = await songsRepository.findById(scheduleSong.songId);
          scheduleSong.dataValues.song = song!;
          console.log("songs.map", index);
          return scheduleSong;
        });

        return await schedule;
      });
      console.log("schedules", schedules);

      return await schedules;
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw new AppError("There was an error querying the data.", 500);
    }
  }

  public async findById(id: string): Promise<Schedule | null> {
    try {
      const schedule = await schedulesRepository.findById(id);
      if (!schedule) {
        throw new AppError("Schedule not found.");
      }
      return schedule;
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw error || new AppError("There was an error querying the data.", 500);
    }
  }

  public async findByDate(date: string): Promise<Schedule[] | null> {
    try {
      return await schedulesRepository.findByDate(date);
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw error || new AppError("There was an error querying the data.", 500);
    }
  }

  public async save(schedule: Schedule): Promise<Schedule> {
    try {
      const createdSchedule = await schedulesRepository.save(schedule);
      // console.log("createdSchedule", createdSchedule);

      schedule.songs?.forEach(async (s) => {
        // console.log("s", s);

        s.scheduleId = createdSchedule.id;
        const song = await songsRepository.findById(s.songId);
        // console.log("song", song);

        (song as Song).tone = s.song?.tone;
        const updatedSong = await songsRepository.update(s.songId, song!);
        // console.log("updatedSong", updatedSong);

        const createdScheduleSong = await scheduleSongsRepository.save(s);
        // console.log("createdScheduleSong", createdScheduleSong);
      });
      return createdSchedule;
    } catch (error: any) {
      await logService.save({
        message: error.message,
        statusCode: error.statusCode,
        error: error.stack ? JSON.stringify(error.stack) : "",
      });
      throw new AppError("There was an error saving the data.", 500);
    }
  }

  public async update(
    id: string,
    schedule: Schedule
  ): Promise<Schedule | null> {
    try {
      const scheduleExist = await schedulesRepository.findById(id);
      if (!scheduleExist) {
        throw new AppError("Schedule not found.");
      }
      return await schedulesRepository.update(id, schedule);
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
      const schedule = await schedulesRepository.findById(id);
      if (!schedule) {
        throw new AppError("Schedule not found.");
      }
      await schedulesRepository.delete(id);
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
