import { queryVerifyUserId } from '../repository/publicationRepository.js';

export async function verifyPostIsUser(req, res, next) {
  const userId = res.locals.userId;
  const { id } = req.params;

  try {
    const { rowCount, rows: post } = await queryVerifyUserId(id, userId);

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

export async function validateIdAndLimit(req, res, next) {
  const { postId } = req.params;
  const { limit } = req.query;

  if (!postId && !limit) {
    return res.status(422).send('Não esqueça de definir o id do post e do limite!');
  }

  next();
}

export async function validatePostId(req, res, next) {
  const { postId } = req.params;

  if (!postId) {
    return res.status(422).send('Não esqueça de definir o id do post!');
  }

  next();
}
