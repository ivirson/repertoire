import Song from "../../songs/models/song.model";
import ScheduleSong from "../models/schedule-song.model";

export default class ScheduleSongsRepository {
  public async findByScheduleId(
    scheduleId: string
  ): Promise<ScheduleSong[] | null> {
    try {
      return await ScheduleSong.findAll({
        where: {
          scheduleId,
        },
        include: [
          {
            model: Song,
            as: "song",
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  public async save(song: ScheduleSong): Promise<ScheduleSong> {
    try {
      return await ScheduleSong.create(song);
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await ScheduleSong.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
