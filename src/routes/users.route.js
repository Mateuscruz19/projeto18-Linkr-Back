import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router("/users");

router.get("/", authenticate, userController.showByUsername);

export { router as usersRouter };
