import {
  findUser,
  insertPosts,
  findUltimoPostId,
  insertHashtags,
  getPublications,
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
