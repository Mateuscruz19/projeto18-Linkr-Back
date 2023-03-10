import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router("/users");

router.get("/", authenticate, userController.showByUsername);
router.get("/current", authenticate, userController.getCurrentUserById);
router.get('/:userId/publication', authenticate, userController.getPublicationByUserId);

export { router as usersRouter };
