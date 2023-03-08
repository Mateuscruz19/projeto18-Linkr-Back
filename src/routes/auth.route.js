import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { userSchema } from "../models/auth.schema.js"
import validateSchema from "../middlewares/validateSchemas.middleware.js";
import { userSchemaValidation } from "../middlewares/auth.middleware.js"

const router = Router();

router.post("/sign-up", validateSchema(userSchema), userSchemaValidation, signUp);
router.post("/sign-in", signIn);


export default router;