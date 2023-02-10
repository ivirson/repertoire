import { Router } from "express";
import authRouter from "./modules/core/auth/routes/auth.routes";
import usersRouter from "./modules/core/users/routes/users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);

export default router;
