import { Router } from "express";
import authRouter from "./modules/core/auth/routes/auth.routes";
import usersRouter from "./modules/core/users/routes/users.routes";
import schedulesRouter from "./modules/schedule/routes/schedule.routes";
import songsRouter from "./modules/songs/routes/songs.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/songs", songsRouter);
router.use("/schedules", schedulesRouter);

export default router;
