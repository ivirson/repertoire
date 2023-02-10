import Song from "../../songs/models/song.model";
import ScheduleSong from "../models/schedule-song.model";
import Schedule from "../models/schedule.model";

export default class SchedulesRepository {
  public async findAll(): Promise<Schedule[]> {
    try {
      return await Schedule.findAll({
        include: [
          {
            model: ScheduleSong,
            as: "songs",
          },
        ],
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  public async findByDate(date: string): Promise<Schedule[]> {
    try {
      return await Schedule.findAll({
        where: {
          date,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<Schedule | null> {
    try {
      return await Schedule.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  public async save(schedule: Schedule): Promise<Schedule> {
    try {
      return await Schedule.create(schedule);
    } catch (error) {
      throw error;
    }
  }

  public async update(
    id: string,
    schedule: Schedule
  ): Promise<Schedule | null> {
    try {
      await Schedule.update(schedule, {
        where: { id },
      });

      return await Schedule.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await Schedule.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
