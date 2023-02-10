import { Request, Response } from "express";
import { AppError } from "../../../shared/models/error.model";
import SongsService from "../services/songs.service";

const songsService = new SongsService();

export default class SongsController {
  /**
   * @swagger
   * /songs:
   *  get:
   *    tags:
   *      - Songs
   *    summary: Get songs
   *    responses:
   *      200:
   *        description: Returns all songs
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Song'
   */
  public async findAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const songs = await songsService.findAll();
      return response.status(200).json(songs);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /songs/{:id}:
   *  get:
   *    tags:
   *      - Songs
   *    summary: Get song by id
   *    parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the song to retrieve.
   *         schema:
   *           type: integer
   *    responses:
   *      200:
   *        description: Returns a song
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Song'
   *      404:
   *        description: Song not found
   */
  public async findById(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const song = await songsService.findById(id);
      return response.status(200).json(song);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /songs/artist:
   *  get:
   *    tags:
   *      - Songs
   *    summary: Get songs by artist
   *    parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: name of artist of the song to retrieve.
   *         schema:
   *           type: string
   *    responses:
   *      200:
   *        description: Returns a list of songs
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Song'
   */
  public async findByArtist(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { artist } = request.query;
      const song = await songsService.findByArtist(artist as string);
      return response.status(200).json(song);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /songs:
   *   post:
   *     tags:
   *       - Songs
   *     summary: Save song
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewSong'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Song'
   */
  public async save(request: Request, response: Response): Promise<Response> {
    try {
      const song = request.body;
      const createdSong = await songsService.save(song);
      return response.status(201).json(createdSong);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /songs/{:id}:
   *   put:
   *     tags:
   *       - Songs
   *     summary: Update song
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the song to update.
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Song'
   *     responses:
   *       200:
   *         description: Updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Song'
   *       404:
   *         description: Song not found
   */
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const song = request.body;
      const updatedSong = await songsService.update(id, song);
      return response.status(200).json(updatedSong);
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }

  /**
   * @swagger
   * /songs/{:id}:
   *   delete:
   *     tags:
   *       - Songs
   *     summary: Delete song
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the song to delete.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Deleted
   */
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      await songsService.delete(id);
      return response.status(200).json();
    } catch (error: AppError | any) {
      return response.status(error.statusCode | 500).json(error);
    }
  }
}
