import { verifyUserIdFollowOtherUser } from '../repository/user.repository.js';

async function verifyFollowUserIdExist(req, res, next) {
  const followUserId = req.params.followUserId;

  if (!followUserId) {
    return res.status(404).send('Precisa informar um id de usuário!');
  }

  next();
}

async function checkIfTheUserHasBeenFollowed(req, res, next) {
  const followUserId = req.params.followUserId;
  const userId = res.locals.userId;

  if (Number(userId) === Number(followUserId)) return res.sendStatus(409);

  try {
    const followExist = await verifyUserIdFollowOtherUser(userId, followUserId);

    res.locals.followExist = followExist.rowCount;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocorreu um erro interno!');
  }
}

export default { verifyFollowUserIdExist, checkIfTheUserHasBeenFollowed };
