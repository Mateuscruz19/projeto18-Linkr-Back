import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { insertNewUser, findExistUser, exportSession } from '../repository/auth.repository.js';

export async function signUp(req, res) {

  const { username, email, password, picture } = res.locals.user;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    await insertNewUser(username, email, passwordHash, picture, today);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const { rows: users } = await findExistUser(email);
  const [user] = users;

  if (!user) {
    return res.sendStatus(401);
  }

  const passwordConfirm = bcrypt.compareSync(password, user.password);

  if (passwordConfirm === true) {
    const token = uuid();
    await exportSession(token, user.id, today);

    return res.status(200).send({ token: token });
  }
  res.sendStatus(401);
}
