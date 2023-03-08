import db from "../database/db.js";

export async function findSessionByToken(token) {
  return db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
}
