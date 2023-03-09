import internalServerError from "../utils/functions/internalServerError.js";
import { findUserById, findUsersByUsername } from "../repository/user.repository.js";

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

export default { showByUsername, getCurrentUserById };
