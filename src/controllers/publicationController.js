import {
  findUser,
  insertPosts,
  findUltimoPostId,
  insertHashtags,
  getPublications,
  deletePostById,
  deleteHashtagByIdPost,
  updatePostByid,
  findPublicationsByUserId,
} from "../repository/publicationRepository.js";

export async function postPublication(req, res) {
  const { link, description } = req.body;

  const userId = res.locals.userId;

  try {
    const ultimoPost = await insertPosts(userId, link, description);

    console.log(ultimoPost);

    function extractHashtags(str) {
      const regex = /#\w+/g; // matches all hashtags in the form #word
      const hashtags = str.match(regex); // extracts all hashtags from the string
      return hashtags || []; // returns an empty array if no hashtags were found
    }

    const hashtags = extractHashtags(description);
    
    for (let i = 0; i < hashtags.length; i++) {
      await insertHashtags(ultimoPost.rows[0].id, hashtags[i]);
    }
    

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

export async function getPublicationByUserId(req, res) {
  const { userId } = req.params;

  try {
    const result = await findPublicationsByUserId(userId);

    const body = result.rows.map((item) => item.json_build_object);

    console.log(body);

    res.status(200).send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updateDescriptionPublication(req, res) {
  const { id } = req.params;
  const { description } = req.body;

  try {
    await updatePostByid(description, id);

    return res.send("Alterado com sucesso!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro interno!");
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
    res.status(500).send("Ocorreu um erro interno!");
  }
}
