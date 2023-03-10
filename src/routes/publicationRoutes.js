import { Router } from "express";
import {
  deletePublication,
  getPublicationByUserId,
  postPublication,
  updateDescriptionPublication,
} from "../controllers/publicationController.js";
import validateSchema from "../middlewares/validateSchemas.middleware.js";
import {
  publicationSchema,
  updatePostSchema,
} from "../models/puclicationSchema.js";
import { getPublication } from "../controllers/publicationController.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { verifyPostIsUser } from "../middlewares/publication.middleware.js";

const router = Router();

router.get("/publication", authenticate, getPublication);
router.get("/publication/user/:userId", authenticate, getPublicationByUserId);
router.post(
  "/publication",
  validateSchema(publicationSchema),
  authenticate,
  postPublication
);
router.put(
  "/publication/:id",
  validateSchema(updatePostSchema),
  authenticate,
  verifyPostIsUser,
  updateDescriptionPublication
);
router.delete(
  "/publication/:id",
  authenticate,
  verifyPostIsUser,
  deletePublication
);

export default router;
