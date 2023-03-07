import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { connectionDB } from "../database/db.js";

export async function signUp(req, res) {
    const { username, email, password,picture } = res.locals.user;

    
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
      await connectionDB.query(
        "INSERT INTO users (email,password,name,avatar_url,updated_at) VALUES ($1, $2, $3, $4, $5)",
        [email, passwordHash, username, picture, today]
      );
  
     return res.sendStatus(201);
    } catch (err) {
     return res.status(422).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = res.locals.user;

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const { rows: users } = await connectionDB.query(
            `SELECT * FROM users WHERE email = $1 `,
            [email]
        );
        const [user] = users;

        if (!user) {
            return res.sendStatus(401);
        }

        const passwordConfirm = bcrypt.compareSync(password, user.password)

        if (passwordConfirm === true) {
            const token = uuid();
            await connectionDB.query(
            `
        INSERT INTO sessions (token, user_Id,expires_at) VALUES ($1, $2, $3)`,
            [token, user.id,today]
            );
           return res.status(200).send({token:token})
        } 
        res.sendStatus(401);
       
}