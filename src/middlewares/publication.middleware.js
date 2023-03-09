import { queryVerifyUserId } from '../repository/publicationRepository.js';

export async function verifyPostIsUser(req, res, next) {
  const userId = res.locals.userId;
  const { id } = req.params;

  console.log(userId);
  console.log(id);

  try {
    const { rowCount, rows: post } = await queryVerifyUserId(id, userId);
    console.log(rowCount);
    if (!rowCount) {
      return res.status(401).send('Esse post não pertence a esse usuário!');
    }

    res.locals.post = post;

    next();
  } catch (error) {
    console.log(error.data);
    res.status(500).send('Ocorreu um erro interno!');
  }
}
