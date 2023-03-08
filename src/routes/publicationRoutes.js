import {Router} from "express";
import { postPublication } from "../controllers/publicationController.js";
import validateSchema from "../middlewares/validateSchemas.middleware.js";
import { publicationSchema } from "../models/puclicationSchema.js";
import { getPublication } from "../controllers/publicationController.js";

const router = Router();

router.post("/publication", validateSchema(publicationSchema), postPublication);
router.get("/publication", getPublication)

export default router;