import { userSchema } from "../models/auth.schema.js";
import { connectionDB } from "../database/db.js";

export async function userSchemaValidation(req, res, next) {

    const user = req.body;
  
    const emailExists = await connectionDB.query("SELECT * FROM users WHERE email=$1",[user.email]);
  
    if (emailExists.rowCount > 0) {
        return res.sendStatus(409);
      }

    res.locals.user = user;

    next();
}

export async function signInBodyValidation(req, res, next) {

    const user = req.body;

    res.locals.user = user;

    next();
}