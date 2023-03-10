import internalServerError from "../utils/functions/internalServerError.js";
import { findPublicationsByUserId, findUserById, findUsersByUsername } from "../repository/user.repository.js";

async function showByUsername(req, res) {
  const { username } = req.query;

  try {
    const { rows: users } = await findUsersByUsername(username);

    res.send(users);
  } catch (error) {
    internalServerError(res, error);
  }
}

async function getCurrentUserById(req, res){
  const {userId} = res.locals;

  try {
    const {rows: currentUser} = await findUserById(userId);

    const {id, name, avatar_url: avatarUrl} = currentUser[0];

    res.send({id, name, avatarUrl});
  } catch (error) {
    internalServerError(res, error);
  }
}

export async function getPublicationByUserId(req, res) {
  const { userId } = req.params;

  try {
    const result = await findPublicationsByUserId(userId);

    const body = result.rows.map((item) => item.json_build_object);

    res.status(200).send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


export default { showByUsername, getCurrentUserById, getPublicationByUserId };
