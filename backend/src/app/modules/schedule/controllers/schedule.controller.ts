import { Request, Response } from "express";
import { AppError } from "../../../shared/models/error.model";
import SchedulesService from "../services/schedule.service";

const schedulesService = new SchedulesService();

export default class SchedulesController {
  /**
   * @swagger
   * /schedules:
   *  get:
   *    tags:
   *      - Schedules
   *    summary: Get schedules
   *    responses:
   *      200:
   *        description: Returns all schedules
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Schedule'
   */
  public async findAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const schedules = await schedulesService.findAll();
      console.log("schedules", schedules);

      return response.status(200).json(schedules);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /schedules/{:id}:
   *  get:
   *    tags:
   *      - Schedules
   *    summary: Get schedule by id
   *    parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the schedule to retrieve.
   *         schema:
   *           type: integer
   *    responses:
   *      200:
   *        description: Returns a schedule
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Schedule'
   *      404:
   *        description: Schedule not found
   */
  public async findById(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const schedule = await schedulesService.findById(id);
      return response.status(200).json(schedule);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /schedules/artist:
   *  get:
   *    tags:
   *      - Schedules
   *    summary: Get schedules by artist
   *    parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: name of artist of the schedule to retrieve.
   *         schema:
   *           type: string
   *    responses:
   *      200:
   *        description: Returns a list of schedules
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Schedule'
   */
  public async findByDate(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { date } = request.params;
      const schedule = await schedulesService.findByDate(date);
      return response.status(200).json(schedule);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /schedules:
   *   post:
   *     tags:
   *       - Schedules
   *     summary: Save schedule
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewSchedule'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Schedule'
   */
  public async save(request: Request, response: Response): Promise<Response> {
    try {
      const schedule = request.body;
      const createdSchedule = await schedulesService.save(schedule);
      return response.status(201).json(createdSchedule);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /schedules/{:id}:
   *   put:
   *     tags:
   *       - Schedules
   *     summary: Update schedule
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the schedule to update.
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Schedule'
   *     responses:
   *       200:
   *         description: Updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Schedule'
   *       404:
   *         description: Schedule not found
   */
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const schedule = request.body;
      const updatedSchedule = await schedulesService.update(id, schedule);
      return response.status(200).json(updatedSchedule);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /schedules/{:id}:
   *   delete:
   *     tags:
   *       - Schedules
   *     summary: Delete schedule
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the schedule to delete.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Deleted
   */
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      await schedulesService.delete(id);
      return response.status(200).json();
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }
}
