import db from "../database/db.js";

export async function findUsersByUsername(username) {
    return db.query(`SELECT id, avatar_url, name FROM users WHERE name ILIKE $1`, [`%${username}%`]);
  }