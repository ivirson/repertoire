import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../middlewares/upload";
import verifyToken from "../../../middlewares/verify-token";
import SongsController from "../controllers/songs.controller";

const songsRouter = Router();
const songsController = new SongsController();

const upload = multer(uploadConfig);

songsRouter.get("/", verifyToken, songsController.findAll);
songsRouter.get("/artist", verifyToken, songsController.findByArtist);
songsRouter.get("/:id", verifyToken, songsController.findById);
songsRouter.post("/", verifyToken, songsController.save);
songsRouter.put("/:id", verifyToken, songsController.update);
songsRouter.delete("/:id", verifyToken, songsController.delete);

export default songsRouter;
