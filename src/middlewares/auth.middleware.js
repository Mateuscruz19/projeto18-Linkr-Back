import { userSchema } from "../models/auth.schema.js";
import db from "../database/db.js";
import internalServerError from "../utils/functions/internalServerError.js";
import { findSessionByToken } from "../repository/auth.repository.js";

export async function userSchemaValidation(req, res, next) {
  const user = req.body;

  const emailExists = await db.query("SELECT * FROM users WHERE email=$1", [
    user.email,
  ]);

  if (emailExists.rowCount > 0) {
    return res.sendStatus(409);
  }

  res.locals.user = user;

  next();
}

export async function signInBodyValidation(req, res, next) {
  const user = req.body;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  res.locals.user = user;

  next();
}

export async function authenticate(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const { rowCount, rows: session } = await findSessionByToken(token);

    if (!rowCount) return res.sendStatus(401);

    res.locals.userId = session[0].userId;

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}
