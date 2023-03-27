import load from "lodash";

import {
  insertPosts,
  insertHashtags,
  getPublications,
  deletePostById,
  deleteHashtagByIdPost,
  updatePostByid,
  findUsersLikByPostId,
  insertLikeInPost,
  deleteLikeInPost,
  insertInfoLinkScrapping,
  insertComment,
  findCommentByPostId,
} from "../repository/publicationRepository.js";
import internalServerError from "../utils/functions/internalServerError.js";
import urlMetadata from "url-metadata";
const PAGE_SIZE = 10;

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
    const metadata = await urlMetadata(link);

    let title_link = metadata.title;
    let description_link = metadata.description;
    let image_link = metadata.image;

    if (!title_link) {
      title_link = null;
    }

    if (!description_link) {
      description_link = null;
    }

    if (!image_link) {
      image_link = null;
    }

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

    await insertInfoLinkScrapping(
      ultimoPost.rows[0].id,
      title_link,
      description_link,
      image_link
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function getPublication(req, res) {
  try {
    const userId = res.locals.userId;
    const result = await getPublications(userId);

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

export async function getPuclicationPage(req, res) {
  const { page } = req.params || 1;
  try {
    const userId = res.locals.userId;
    const result = await getPublications(userId);

    const body = result.rows.map((item) => {
      if (item.json_build_object.idUsersLike[0].id === null) {
        item.json_build_object.idUsersLike = [];
      }
      return item.json_build_object;
    });

    const pagineted = load.chunk(body, PAGE_SIZE)[page - 1] || [];

    res.send(pagineted);
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

export async function createComment(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;
  const { comment } = req.body;

  try {
    await insertComment({ postId, userId, comment });

    res.sendStatus(201);
  } catch (error) {
    internalServerError(res, error);
  }
}

export async function getCommentsByPostId(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;

  try {
    const { rowCount, rows: commentsData } = await findCommentByPostId({
      postId,
      userId,
    });

    if (!rowCount) return res.status(200).send(null);

    const comments = commentsData.map((c) => {
      if (c.userId === c.authorId) return { ...c, status: `post's author` };

      if (c.following) return { ...c, status: "following" };

      return c;
    });

    res.send(comments).status(200);
  } catch (error) {
    internalServerError(res, error);
  }
}
