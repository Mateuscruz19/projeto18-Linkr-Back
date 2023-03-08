import internalServerError from "../utils/functions/internalServerError.js";
import { findUsersByUsername } from "../repository/user.repository.js";

async function showByUsername(req, res) {
  const { username } = req.query;

  try {
    const { rows: users } = await findUsersByUsername(username);

    res.send(users);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { showByUsername };
