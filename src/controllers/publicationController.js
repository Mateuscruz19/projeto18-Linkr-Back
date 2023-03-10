import {
  findUser,
  insertPosts,
  findUltimoPostId,
  insertHashtags,
  getPublications,
  deletePostById,
  deleteHashtagByIdPost,
  updatePostByid,
  findUsersLikByPostId,
  insertLikeInPost,
  deleteLikeInPost,
} from "../repository/publicationRepository.js";

export async function getUserLikePublication(req, res) {
  const { postId } = req.params;
  const { limit } = req.query;

  try {
    const users = await findUsersLikByPostId(postId, limit);

    res.send(users.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro interno!");
  }
}

export async function postPublication(req, res) {
  const { link, description } = req.body;

  const userId = res.locals.userId;

  try {
    const ultimoPost = await insertPosts(userId, link, description);

    const hashtags = description
      .split(" ")
      .filter((word) => word.charAt() === "#");

    if (hashtags.length) {
      const inserts = [];

      for (let index = 1; index <= hashtags.length; index++) {
        inserts.push(`(${ultimoPost.rows[0].id} ,$${index})`);
      }

      await insertHashtags(inserts.join(", "), hashtags);
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getPublication(req, res) {
  try {
    const result = await getPublications();

    const body = result.rows.map((item) => {
      if (item.json_build_object.idUsersLike[0].id === null) {
        item.json_build_object.idUsersLike = [];
      }
      return item.json_build_object;
    });

    res.status(200).send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function sendLikeInPost(req, res) {
  const { postId } = req.params;
  const userId = res.locals.userId;

  try {
    await insertLikeInPost(postId, userId);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro interno!");
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
  
  try {
    await deleteHashtagByIdPost(id);
    await deletePostById(id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro interno!");
  }
}

export async function deleteLikePublication(req, res) {
  const { postId } = req.params;
  const userId = res.locals.userId;

  try {
    await deleteLikeInPost(postId, userId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro interno!");
  }
}
