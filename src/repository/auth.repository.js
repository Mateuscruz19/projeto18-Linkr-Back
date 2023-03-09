import db from '../database/db.js';

export async function findUserAlreadyExist(user) {
  return db.query('SELECT * FROM users WHERE email=$1', [user.email]);
}

export async function insertNewUser(username, email, passwordHash, picture, today) {
  return db.query(
    'INSERT INTO users (email,password,name,avatar_url,updated_at) VALUES ($1, $2, $3, $4, $5)',
    [email, passwordHash, username, picture, today]
  );
}

export async function findExistUser(email) {
  return db.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}

export async function exportSession(token, id, today) {
  return db.query(
    `
INSERT INTO sessions (token, user_Id,expires_at) VALUES ($1, $2, $3)`,
    [token, id, today]
  );
}

export async function findSessionByToken(token) {
  return await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
}
