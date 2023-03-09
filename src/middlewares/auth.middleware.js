import internalServerError from '../utils/functions/internalServerError.js';
import { findSessionByToken, findUserAlreadyExist } from '../repository/auth.repository.js';


export async function userSchemaValidation(req, res, next) {
  const user = req.body;

  const emailExists = await findUserAlreadyExist(user);

  if (emailExists.rowCount > 0) {
    return res.sendStatus(409);
  }

  res.locals.user = user;

  next();
}

export async function authenticate(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');


  if (!token) return res.sendStatus(401);

  try {
    const { rowCount, rows: session } = await findSessionByToken(token);

    if (!rowCount) return res.sendStatus(401);

    res.locals.userId = session[0].user_id;

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}
