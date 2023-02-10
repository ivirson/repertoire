import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../middlewares/upload";
import verifyToken from "../../../middlewares/verify-token";
import SchedulesController from "../controllers/schedule.controller";

const schedulesRouter = Router();
const schedulesController = new SchedulesController();

schedulesRouter.get("/", verifyToken, schedulesController.findAll);
schedulesRouter.get("/date/:date", verifyToken, schedulesController.findByDate);
schedulesRouter.get("/:id", verifyToken, schedulesController.findById);
schedulesRouter.post("/", verifyToken, schedulesController.save);
schedulesRouter.put("/:id", verifyToken, schedulesController.update);
schedulesRouter.delete("/:id", verifyToken, schedulesController.delete);

export default schedulesRouter;
