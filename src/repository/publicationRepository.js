import db from "../database/db.js";

export async function findUser(token) {
  const result = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
    token,
  ]);
  return result;
}

export async function insertPosts(user, link, desc) {
  const result = await db.query(
    `INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3) RETURNING id`,
    [user, link, desc]
  );
  return result;
}

export async function findUltimoPostId() {
  const result = await db.query(`SELECT * FROM posts`);
  return result;
}

export async function insertHashtags(insertIndex, hashtags) {
  const result = await db.query(
    `INSERT INTO hashtags (post_id, name) VALUES ${insertIndex}`,
    hashtags
  );
  return result;
}

export async function getPublications(user_id) {
  const result = await db.query(`
    SELECT json_build_object(
      'id', posts.id,
      'userId', users.id,
      'name', users.name,
      'avatarImage', users.avatar_url,
      'descriptionPost', posts.description,
      'linkPost', posts.link,
      'qtyLikesPost', COUNT(likes.id),
      'idUsersLike', array_agg(json_build_object(
      'id', likes.user_id
      )),
      'hashtags', array_agg(json_build_object(
          'id', hashtags.id,
          'nameHashtag', hashtags.name
      ))
    )
    FROM users
    JOIN posts
    ON users.id = posts.user_id
    LEFT JOIN hashtags
    ON posts.id = hashtags.post_id
    LEFT JOIN likes
    ON posts.id = likes.post_id
    JOIN followers
    ON followers.followed_id = users.id
    WHERE followers.user_id = $1
    GROUP BY users.id, posts.id
    ORDER BY posts.id DESC;`, [user_id]);

  return result;
}

export async function queryVerifyUserId(postId, userId) {
  return await db.query(
    `SELECT
  posts.id AS "postId",
  posts.user_id AS "userId",
  hashtags.id AS "hashtagId"
  FROM posts
  LEFT JOIN hashtags
  ON posts.id = hashtags.post_id
  WHERE posts.id = $1 and posts.user_id = $2;`,
    [postId, userId]
  );
}

export async function deleteHashtagByIdPost(postId) {
  return await db.query("DELETE FROM hashtags WHERE post_id = $1", [postId]);
}

export async function deletePostById(postId) {
  return await db.query("DELETE FROM posts WHERE id = $1", [postId]);
}

export async function updatePostByid(description, postId) {
  return await db.query("UPDATE posts SET description=$1 WHERE id = $2;", [
    description,
    postId,
  ]);
}

export async function findUsersLikByPostId(id, limit) {
  return db.query(
    `
  SELECT posts.id AS "postId",
      posts.user_id AS "createdUserId",
      users.id AS "userId",
      users.name AS "nameUser"
    FROM posts
    RIGHT JOIN likes
    ON posts.id = likes.post_id
    LEFT JOIN users
    ON likes.user_id = users.id
    WHERE posts.id = $1
    ORDER BY likes.id DESC
    LIMIT $2;`,
    [id, limit]
  );
}

export async function insertLikeInPost(postId, userId) {
  return db.query("INSERT INTO likes (post_id,user_id) VALUES ($1, $2);", [
    postId,
    userId,
  ]);
}

export async function deleteLikeInPost(postId, userId) {
  return db.query("DELETE FROM likes WHERE post_id = $1 and user_id = $2;", [
    postId,
    userId,
  ]);
}

export async function insertComment({ postId, userId, comment }) {
  return db.query(
    "INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3);",
    [postId, userId, comment]
  );
}
export async function findCommentByPostId({postId, userId}) {
  return db.query(
    `
    SELECT
      c.user_id AS "userId",
	    p.user_id AS "authorId",
      u.name,
      u.avatar_url AS "avatarImage",
      c.comment,
      c.id,
	    (c.user_id IN (SELECT "followed_id"
                FROM followers
                WHERE "user_id" = $2)) as following
    FROM comments c
   	JOIN users u
    ON u.id = c.user_id
	JOIN posts p
	ON p.id = c.post_id
    WHERE c.post_id = $1
    ORDER BY c.id DESC
  `,
    [postId, userId]
  );
}

export async function findFollowedsByUserId(userId){
  return db.query(
    `
    SELECT
      followed_id AS "followedId"
    FROM followers
    WHERE user_id = $1
  `,
    [userId]
  );
}