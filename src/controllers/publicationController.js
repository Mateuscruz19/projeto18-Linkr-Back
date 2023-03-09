import {
  findUser,
  insertPosts,
  findUltimoPostId,
  insertHashtags,
  getPublications,
  deletePostById,
  deleteHashtagByIdPost,
} from '../repository/publicationRepository.js';

export async function postPublication(req, res) {
  const { link, description, name } = req.body;

  const userId = res.locals.userId;

  try {
    const ultimoPost = await insertPosts(userId, link, description);

    console.log(ultimoPost);

    await insertHashtags(ultimoPost.rows[0].id, name);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getPublication(req, res) {
  try {
    const result = await getPublications();

    const body = result.rows.map((item) => item.json_build_object);

    console.log(body);

    res.status(200).send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deletePublication(req, res) {
  const { id } = req.params;
  const post = res.locals.post;

  console.log(post);
  try {
    await deleteHashtagByIdPost(id);
    await deletePostById(id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocorreu um erro interno!');
  }
}
