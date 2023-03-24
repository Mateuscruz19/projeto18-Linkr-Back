import internalServerError from '../utils/functions/internalServerError.js';
import {
  findPublicationsByUserId,
  findUserById,
  findUsersByUsername,
  insertFollowUser,
  deleteFollowUserRepository,
  doesUserFollowsSomeone
} from '../repository/user.repository.js';

async function showByUsername(req, res) {
  const { userId } = res.locals;
  const { username } = req.query;

  try {
    const { rows: users } = await findUsersByUsername(username, userId);

    res.send(users);
  } catch (error) {
    console.log(error)
    internalServerError(res, error);
  }
}

async function getCurrentUserById(req, res) {
  const { userId } = res.locals;

  try {
    const { rows: currentUser } = await findUserById(userId);

    const { id, name, avatar_url: avatarUrl } = currentUser[0];

    res.send({ id, name, avatarUrl });
  } catch (error) {
    internalServerError(res, error);
  }
}

async function getPublicationByUserId(req, res) {
  const { userId } = req.params;

  try {
    const result = await findPublicationsByUserId(userId);

    const body = result.rows.map((item) => item.json_build_object);

    res.status(200).send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function verifyFollowUser(req, res) {
  const followExist = res.locals.followExist;
  try {
    console.log(followExist);
    if (followExist == 0) {
      return res.send(false);
    }
    if (followExist == 1) {
      return res.send(true);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocorreu um erro interno!');
  }
}

async function postFollowUser(req, res) {
  const followUserId = req.params.followUserId;
  const userId = res.locals.userId;
  const followExist = res.locals.followExist;
  console.log(followExist);
  if (followExist > 0) return res.status(409).send('Você não pode seguir alguém já seguido!');
  try {
    await insertFollowUser(userId, followUserId);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocorreu um erro interno!');
  }
}

async function deleteFollowUser(req, res) {
  const followUserId = req.params.followUserId;
  const userId = res.locals.userId;
  const followExist = res.locals.followExist;
  console.log(userId);

  if (followExist <= 0)
    return res.status(409).send('Você não pode des seguir alguém que ainda não seguiu!');

  try {
    console.log(followUserId);
    await deleteFollowUserRepository(userId, Number(followUserId));

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocorreu um erro interno!');
  }
}

async function doesUserFollows(req, res){
  const userId = res.locals.userId;
  try {
    const result = await doesUserFollowsSomeone(userId)
    if (result.rows.length === 0){
      res.status(200).send(false)
    } else {
      res.status(200).send(true)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocorreu um erro interno!');
  }
}

export default {
  showByUsername,
  getCurrentUserById,
  getPublicationByUserId,
  postFollowUser,
  deleteFollowUser,
  verifyFollowUser,
  doesUserFollows
};
